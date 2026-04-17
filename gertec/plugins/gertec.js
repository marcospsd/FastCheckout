// app.plugin.js
const {
  withAppBuildGradle,
  withDangerousMod,
} = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

const DEPENDENCIES = `
repositories {
    flatDir {
            dirs 'libs'
        }
}
`

const GERTEC_SIGNING_BLOCK = `
        gertec {
            storeFile file('..\\\\..\\\\Chaves\\\\Development_GertecDeveloper_EnhancedAPP.jks')
            storePassword 'Development@GertecDeveloper2018'
            keyAlias 'developmentgertecdeveloper_enhancedapp'
            keyPassword 'Development@GertecDeveloper2018'
        }
`;


const BUILD_TYPES_BLOCK = `
    buildTypes {
        debug {
            signingConfig signingConfigs.gertec
        }
        release {
            // Caution! In production, you need to generate your own keystore file.
            // see https://reactnative.dev/docs/signed-apk-android.
            shrinkResources (findProperty('android.enableShrinkResourcesInReleaseBuilds')?.toBoolean() ?: false)
            minifyEnabled enableProguardInReleaseBuilds
            proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
            crunchPngs (findProperty('android.enablePngCrunchInReleaseBuilds')?.toBoolean() ?: true)
            signingConfig signingConfigs.gertec
        }
    }
`;

const DEP_LINES = [
  `implementation fileTree(dir: 'libs', include: ['*.jar'])`,
  `implementation(name: 'android-easy-layer-gpos780-2.1.4-debug', ext: 'aar')`,
  `implementation(name: 'libgedi-1.16.19-gpos780-payment-release', ext: 'aar')`,
];


function insertFlatDirBeforeAndroidInApp(gradle) {
  // se já tiver flatDir/libs, não repete
  if (gradle.includes("flatDir") || gradle.includes("dirs 'libs'")) {
    return gradle;
  }

  return gradle.replace(
    /android\s*{/,
    `${DEPENDENCIES}\n\nandroid {`
  );
}
function addGertecSigningConfig(gradle) {
    // Se já tiver gertec configurado, não mexe
    if (gradle.includes('gertec {')) {
      return gradle;
    }

    // ✅ Caso já exista signingConfigs + debug: injeta depois do debug {}
    if (gradle.includes('signingConfigs') && gradle.includes('debug {')) {
      return gradle.replace(
        /(debug\s*{[\s\S]*?^\s*}\s*)/m,   // pega o bloco "debug { ... }" até o "}" dele
        (match) => `${match}\n${GERTEC_SIGNING_BLOCK}\n`
      );
    }

    // ✅ Caso NÃO exista signingConfigs: cria um bloco novo dentro de android { ... }
    if (gradle.includes('android')) {
      return gradle.replace(
        /android\s*{/, 
        `android {\n    signingConfigs {\n${GERTEC_SIGNING_BLOCK}\n    }\n`
      );
    }

    // fallback: não conseguiu achar nada relevante, devolve como veio
    return gradle;
}


function setBuildTypesBlock(gradle) {
  // Se não existir buildTypes, criamos um bloco novo padrão já com gertec
  if (!gradle.includes('buildTypes')) {
    return gradle.replace(
      /android\s*{([\s\S]*?)}/m,
      (match, inner) => `android {\n${inner}\n${BUILD_TYPES_BLOCK}\n}`
    );
  }

    // 1) DEBUG: troca signingConfigs.debug -> signingConfigs.gertec
    gradle = gradle.replace(
      /(buildTypes\s*{[\s\S]*?debug\s*{[\s\S]*?signingConfig\s+)signingConfigs\.debug/,
      '$1signingConfigs.gertec'
    );

    // 2) RELEASE: remove qualquer signingConfig (debug/gertec) e adiciona gertec no final
    gradle = gradle.replace(
      /release\s*{([\s\S]*?)\n\s*}\s*/m,
      (fullMatch, inner) => {
        let r = inner;

        // remove linhas com signingConfig signingConfigs.debug ou .gertec
        r = r.replace(
          /^\s*signingConfig\s+signingConfigs\.(debug|gertec)\s*[\r\n]*/gm,
          ''
        );

        // garante que termina com quebra de linha
        if (!r.endsWith('\n')) {
          r += '\n';
        }

        // monta de volta o bloco release com signingConfig gertec no final
        return `release {${r}            signingConfig signingConfigs.gertec\n        }`;
      }
    );

  return gradle;
}


function ensureDependencies(gradle) {
  if (!gradle.includes('dependencies')) {
    const newBlock =
      `\ndependencies {\n` +
      DEP_LINES.map((l) => `    ${l}`).join('\n') +
      `\n}\n`;
    return gradle + newBlock;
  }

  return gradle.replace(
    /dependencies\s*{([\s\S]*?)\n}\s*$/m,
    (match, inner) => {
      let updated = inner;
      DEP_LINES.forEach((line) => {
        if (!updated.includes(line)) {
          updated += `\n    ${line}`;
        }
      });
      return `dependencies {${updated}\n}\n`;
    }
  );
}

// ===== 2) Copiar os .aar para android/app/libs =====

function withGertecAarCopy(config) {
  return withDangerousMod(config, [
    'android',
    async (config) => {
      const projectRoot = config.modRequest.projectRoot;

      // De onde você vai pegar os .aar no seu repo
      const sourceDir = path.join(projectRoot, 'native-libs');
      const sourceFiles = [
        'android-easy-layer-gpos780-2.1.4-debug.aar',
        'libgedi-1.16.19-gpos780-payment-release.aar',
      ];

      // Para onde vão: android/app/libs
      const libsDir = path.join(projectRoot, 'android', 'app', 'libs');

      if (!fs.existsSync(libsDir)) {
        fs.mkdirSync(libsDir, { recursive: true });
      }

      for (const file of sourceFiles) {
        const from = path.join(sourceDir, file);
        const to = path.join(libsDir, file);

        if (!fs.existsSync(from)) {
          console.warn(`[GertecPlugin] .aar não encontrado em: ${from}`);
          continue;
        }

        fs.copyFileSync(from, to);
        console.log(`[GertecPlugin] Copiado: ${from} -> ${to}`);
      }

      return config;
    },
  ]);
}

function withKotlinNativeLibs(config) {
  return withDangerousMod(config, [
    'android',
    async (config) => {
      const projectRoot = config.modRequest.projectRoot;

      // De onde você vai pegar os .kt no seu repo
      const sourceDir = path.join(projectRoot, 'native-libs');
      const sourceFiles = [
        'GertecPrinterModule.kt',
        'GertecPrinterPackage.kt',
      ];

      // Para onde vão: android/app/src/main/java/com/dinizvitoria/fastcheckout
      const destDir = path.join(
        projectRoot,
        'android',
        'app',
        'src',
        'main',
        'java',
        'com',
        'dinizvitoria',
        'fastcheckout'
      );

      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }

      for (const file of sourceFiles) {
        const from = path.join(sourceDir, file);
        const to = path.join(destDir, file);

        if (!fs.existsSync(from)) {
          console.warn(`[GertecPlugin] Arquivo Kotlin não encontrado em: ${from}`);
          continue;
        }

        fs.copyFileSync(from, to);
        console.log(`[GertecPlugin] .kt copiado: ${from} -> ${to}`);
      }

      return config;
    },
  ]);
}

function withMainApplicationGertec(config) {
  return withDangerousMod(config, [
    'android',
    async (config) => {
      const projectRoot = config.modRequest.projectRoot;

      const mainAppPath = path.join(
        projectRoot,
        'android',
        'app',
        'src',
        'main',
        'java',
        'com',
        'dinizvitoria',
        'fastcheckout',
        'MainApplication.kt'
      );

      if (!fs.existsSync(mainAppPath)) {
        console.warn('[GertecPlugin] MainApplication.kt não encontrado:', mainAppPath);
        return config;
      }

      let contents = fs.readFileSync(mainAppPath, 'utf8');

      // 1. Adicionar import
      const importLine = 'import com.dinizvitoria.fastcheckout.GertecPrinterPackage \nimport br.com.gertec.gedi.GEDI';

      if (!contents.includes(importLine)) {
        contents = contents.replace(
          /(package[^\n]*\n)/,
          `$1${importLine}\n`
        );
      }

      // 2. Substituir o método inteiro getPackages()
      contents = contents.replace(
        /return\s+PackageList\(this\)\.packages/m,
        `val packages = PackageList(this).packages
        packages.add(GertecPrinterPackage())
        return packages`
      );

      contents = contents.replace(
        /ApplicationLifecycleDispatcher\.onApplicationCreate\(this\)/,
        `ApplicationLifecycleDispatcher.onApplicationCreate(this)\n    GEDI.init(this)`
      );

      fs.writeFileSync(mainAppPath, contents, 'utf8');
      console.log('[GertecPlugin] MainApplication.kt atualizado com GertecPrinterPackage');

      return config;
    },
  ]);
}



function withGertecGradle(config) {
  return withAppBuildGradle(config, (config) => {
    if (!config.modResults || !config.modResults.contents) return config;

    let contents = config.modResults.contents;

    contents = addGertecSigningConfig(contents);
    contents = setBuildTypesBlock(contents);
    contents = ensureDependencies(contents);
    contents = insertFlatDirBeforeAndroidInApp(contents);
    

    config.modResults.contents = contents;
    return config;
  });
}

module.exports = function withGertecConfig(config) {
  config = withGertecGradle(config);
  config = withGertecAarCopy(config);
  contents = withKotlinNativeLibs(config);
  contents = withMainApplicationGertec(config);
  return config;
};

package com.dinizvitoria.fastcheckout

import android.graphics.BitmapFactory
import android.util.Log
import com.facebook.react.bridge.*
import br.com.gertec.easylayer.printer.Alignment
import br.com.gertec.easylayer.printer.BarcodeFormat
import br.com.gertec.easylayer.printer.BarcodeType
import br.com.gertec.easylayer.printer.PrintConfig
import br.com.gertec.easylayer.printer.Printer
import br.com.gertec.easylayer.printer.PrinterError
import br.com.gertec.easylayer.printer.PrinterException
import br.com.gertec.easylayer.printer.TextFormat


class GertecPrinterModule(
    private val reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext), Printer.Listener {

    private val printer: Printer by lazy {
        Printer.getInstance(reactContext, this)
    }

    override fun getName(): String = "GertecPrinter"

    // Exemplo simples: imprime texto
    @ReactMethod
    fun printText(text: String, promise: Promise) {
        try {
            if (text.isEmpty()) {
                promise.reject("EMPTY_TEXT", "Texto vazio para impressão")
                return
            }

            val textFormat = TextFormat().apply {
                bold = true
                underscore = false
                fontSize = 30
                lineSpacing = 6
                setAlignment(Alignment.LEFT)
            }

            printer.printText(textFormat, text)
            printer.scrollPaper(100)

            promise.resolve(null)
        } catch (e: Exception) {
            Log.e("GertecPrinter", "Erro ao imprimir texto", e)
            promise.reject("PRINT_ERROR", e.message, e)
        }
    }

    // Exemplo: imprimir HTML (cupom)
    @ReactMethod
    fun printHtml(html: String, promise: Promise) {
        try {
            printer.printHtml(reactContext, html)
            printer.scrollPaper(100)
            promise.resolve(null)
        } catch (e: PrinterException) {
            Log.e("GertecPrinter", "Erro ao imprimir HTML", e)
            promise.reject("PRINT_HTML_ERROR", e.message, e)
        }
    }

    // Exemplo: imprimir código de barras simples
    @ReactMethod
    fun printQrCode(data: String, promise: Promise) {
        try {
            val textFormat = TextFormat().apply {
                setAlignment(Alignment.CENTER)
                fontSize = 40
            }

            val qrFormat = BarcodeFormat(BarcodeType.QR_CODE).apply {
                size = BarcodeFormat.Size.HALF_PAPER
            }

            printer.printText(textFormat, "QRCODE")
            printer.printBarcode(qrFormat, data)
            printer.scrollPaper(130)

            promise.resolve(null)
        } catch (e: Exception) {
            Log.e("GertecPrinter", "Erro ao imprimir QRCode", e)
            promise.reject("PRINT_QR_ERROR", e.message, e)
        }
    }

    // Callbacks do Listener
    override fun onPrinterError(printerError: PrinterError) {
        Log.e(
            "GertecPrinter",
            "Erro impressora - causa: ${printerError.cause} | código: ${printerError.code} | reqId: ${printerError.requestId}"
        )
    }

    override fun onPrinterSuccessful(requestId: Int) {
        Log.i("GertecPrinter", "Requisição $requestId executada com sucesso")
    }
}

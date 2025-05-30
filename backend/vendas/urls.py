from django.urls import path
from .views import *
from rest_framework.routers import SimpleRouter

vendarouter = SimpleRouter()
vendarouter.register('venda', VendaViewSet)
vendarouter.register('patchvenda', VendaSecView)
vendarouter.register('vendafinalizada', VendaFinalizadaViewSet)
vendarouter.register('corpovenda', CorpoVendaViewSet)
vendarouter.register(r'formavenda', FormaVendaViewSet)
vendarouter.register('resumovendas', ResumoVendasView)


urlpatterns = [
    path("resumoprodutos/", ResumoProdutosView.as_view()),
    path("resumocondpag/", ResumoCondPags.as_view()),
    path("removerecebimento/", RemoveRecebimentoSITEF.as_view()),
    path("associarrecebimentos/", AssociarRecebimentoSITEF.as_view()),
]



from django.conf import settings


def site_links(request):
    return {"site_links": getattr(settings, "PORTFOLIO_LINKS", {})}

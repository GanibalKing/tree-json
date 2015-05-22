/**
 * Cross-domain XmlHttpRequest object
 */
function getXHR() {
    var xmlhttp;

    try {
        xmlhttp = new ActiveXObject("MSXML2.XMLHTTP.3.0"); // IE 7 - use ActiveXObject,  params - MSXML2.XMLHTTP.3.0
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); // IE 6/5 - use ActiveXObject,  params - Microsoft.XMLHTTP
        } catch (E) {
            xmlhttp = false;
        }
    }

    if (!xmlhttp) {
        if (window.XDomainRequest) {
            xmlhttp = new XDomainRequest(); //  IE 8/9  have old object XMLHttpRequest but, have XDomainRequest
        } else if (typeof XMLHttpRequest != 'undefined') {
            xmlhttp = new XMLHttpRequest(); // IE 10 and other
        }
    }
    return xmlhttp;
}
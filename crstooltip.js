function r(a) {
    return '<span style="text-align:right">' + Math.ceil(100 * a) / 100 + "</span>"
}
var css = document.createElement("style");
css.type = "text/css";
css.innerHTML = "#tooltip {background-color:white;border: 1px solid #dd4814; padding:0px;border-radius:4px; min-width:150px;opacity:0.95;font-family:arial, sans-serif}.card{background: #772953;color: #fff;padding: 5px 9px;margin: 5px 5px;text-align:right;}#loading{margin: 5px;padding:5px}";
document.body.appendChild(css)
$("#tbl-search tbody tr td:nth-child(2)").each(function() {
    st = this.innerHTML, name = st.split("<br>")[1], this.innerHTML = st.replace(name, '<span class="rupp-tooltip">' + name + "</span>"), names = name.split(","), firstName = names[1], lastName = names[0]
});
$.ajaxSetup({
    cache: !0
});
$(document).ready(function(){
    $(".rupp-tooltip").tooltip({
        delay: 0,
        bodyHandler: function() {
            var a = this.innerHTML;
            names = a.split(","), firstName = names[1].slice(1), lastName = names[0], $(this).addClass("tipstered"), $(this).one("mouseout", function() {
                $(this).removeClass("tipstered")
            });
            var t = this;
            return $.ajax({
                url: "https://rupp.herokuapp.com/prof-tooltip",
                data: {
                    firstName: firstName,
                    lastName: lastName
                },
                cache: !0,
                success: function(a) {
                    function e(a) {
                        return a.charAt(0).toUpperCase() + a.slice(1)
                    }
                    function n(a) {
                        return '<div style="background-color:#dd4814;color:#ffffff;padding:5px;">' + a + "</div>"
                    }
                    function i(a, t) {
                        return s = '<small style="float:left">' + e(t) + "</small>" + r(a.rating[t]), '<p class="card">' + s + "</p>"
                    }
                    var l = $(t).hasClass("tipstered");
                    if (l) {
                        var o = "<div>" + n(a.lastName + ", " + a.firstName) + i(a, "overall") + i(a, "easiness") + i(a, "helpfulness") + i(a, "pedagogy") + "</div>";
                        $("#loading").parent().html(o)
                    }
                }
            }), '<span id="loading">Loading...</span>'
        },
        showURL: !1
    })
});

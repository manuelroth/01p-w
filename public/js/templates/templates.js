(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['image'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"captionbar\">\n    <span onclick=\"return false\" class=\"currentweek\">\n        "
    + alias4(((helper = (helper = helpers.week || (depth0 != null ? depth0.week : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"week","hash":{},"data":data}) : helper)))
    + "</span>\n    <span onclick=\"return false\" class=\"currentyear\">\n        "
    + alias4(((helper = (helper = helpers.year || (depth0 != null ? depth0.year : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"year","hash":{},"data":data}) : helper)))
    + "</span>"
    + alias4(((helper = (helper = helpers.caption || (depth0 != null ? depth0.caption : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"caption","hash":{},"data":data}) : helper)))
    + "\n    <span class=\"fullscreen\"></span>\n    <a href=\"https://01p-w.com/2018\" alt=\""
    + alias4(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data}) : helper)))
    + "\">\n        <span class=\"galeriebutton\"></span>\n    </a>\n</div>\n<a href=\"https://01p-w.com/2018/"
    + alias4(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data}) : helper)))
    + "\" alt=\"Link to photo\">\n    <article class=\"image inactive\" data-piio-bck=\""
    + alias4(((helper = (helper = helpers.downloadUrl || (depth0 != null ? depth0.downloadUrl : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"downloadUrl","hash":{},"data":data}) : helper)))
    + "\">\n        <p class=\"number\">"
    + alias4(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data}) : helper)))
    + "</p>\n        <button class=\"deletesingle\">&#x1F5D1;</button>\n         <button class=\"addsingle\">+</button>\n        <div class=\"cross\"></div>\n    </article>\n</a>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.images : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
})();
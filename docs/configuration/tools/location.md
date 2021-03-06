{% include_relative include/breadcrumbs.md %}

# Location Tool

If this tool is enabled, then clicking on the map will show a popup giving the clicked point's location.
If the [`"identify"` tool](identify) or [`"directions"` tool](directions) are enabled, then buttons are visible on this popup with additional actions.

This is default configuration for the Location tool (click on a property name for more information):
<pre>
{ "tools": [ {
    <a href="#type-property"        >"type"</a>:        "location",
    <a href="#enabled-property"     >"enabled"</a>:     true,
    <a href="#showheader-property"  >"showHeader"</a>:  false
} ] }
</pre>

{% include_relative include/type-property.md %}
{% include_relative include/enabled-property.md %}
{% include_relative include/show-header-property.md %}

// Script

    section_data = {};
    if (typeof frappe.module_links == 'undefined') frappe.module_links = {};

frappe.templates["render_awesome_menu"] = '<div class="ivm-mega-menu-panel">'
+'{% for (var i=0; i < data.length; i++) { var section = data[i]; %}'
+'{% if ((i % 2)===0) { %}<div uk-grid>{% } %}'
+'  <div class="uk-width-expand@s"><div class="uk-panel">'
+'      <h4>{{ section.label }}</h4>'
+'      <ul class="uk-nav">'
+'      {% for (var j=0; j < section.items.length; j++) {'
+'          var item = section.items[j];'
+'          if(item.shown) { %}'
+'              <li>'
+'                  <a '
+'                      {% if(item.type==="help") { %}'
+'                          data-youtube-id="{{ item.youtube_id }}"{% } %}'
+'                      href="#{{ item.route }}" style="{{ item.style }}">'
+'                      {{ item.label || __(item.name) }}'
+'                  </a>'
+'              </li>'
+'          {% } %}'
+'      {% } %}'
+'      </ul>'
+'  </div></div>'
+'{% if ((i % 2)===1 || i===data.length-1) { %}</div>{% } %}'
+'{% } %}'
+'</div>';

    

    let get_page_modules = () => {
        return frappe.get_desktop_icons(true)
            .filter(d => d.type==='module' && !d.blocked)
            .sort((a, b) => { return (a._label > b._label) ? 1 : -1; });
    };

    let get_module_sidebar_item = (item) => `<li>
        <a data-name="${item.module_name}" href="#modules/${item.module_name}">
            ${item._label}
        </a>
    </li>`;

    let get_sidebar_html = () => {
        let sidebar_items_html = get_page_modules()
            .map(get_module_sidebar_item.bind(this)).join("");

        return `${sidebar_items_html}`;
    };


// Get the submenu

    frappe.templates["awesome_logo"] = '        <div class="uk-containers uk-sections">'
+'            <a id="ivm-mega-menu-mobile-button" class="uk-button uk-button-primary uk-width-1-1 uk-hidden@m">Menu</a>'
+'            <a id="ivm-mega-menu-button" class="uk-button uk-button-primary uk-visible@m" data-menu-mode="hover">Menu <i class="fa fa-chevron-down pull-right" style="display: block;"></i></a>'
+'            <div id="ivm-mega-menu-wrapper">'
+'                <div id="ivm-mega-menu">'
+'                    <ul id="ivm-mega-menu-items">'
+'                    </ul>'
+'                    <div id="ivm-mega-menu-panels">'
+'                    </div>'
+'                </div>'
+'            </div>'
+'        </div>'
    

    var render_section_buffer = function(m){
        buffer_menu = "";
        m.data.forEach(function(each_Module){
            var m = frappe.get_module(each_Module.modules);
            m.data = each_Module.data;
            process_data(each_Module.modules,m.data);
            buffer_menu += render_section(m);
        });
        $("#ivm-mega-menu-panels").html(buffer_menu);
        return buffer_menu;
    }

    var show_section = function() {
        module_name = get_page_modules().map(x => x.module_name).join(",")
        return frappe.call({
                method: "frappe.desk.moduleview.get_multi",
                args: {
                    module: module_name
                },
                callback: function(r) {
                    console.log(r.message);
                    return render_section_buffer(r.message)
                },
            freeze: true,
            async: true
            });
        

    };

    var render_section = function(m) {
        return frappe.render_template('render_awesome_menu', m);
    };

    var process_data = function(module_name, data) {
        frappe.module_links[module_name] = [];
        data.forEach(function(section) {
            section.items.forEach(function(item) {
                item.style = '';
                if(item.type==="doctype") {
                    item.doctype = item.name;

                    // map of doctypes that belong to a module
                    frappe.module_links[module_name].push(item.name);
                }
                if(!item.route) {
                    if(item.link) {
                        item.route=strip(item.link, "#");
                    }
                    else if(item.type==="doctype") {
                        if(frappe.model.is_single(item.doctype)) {
                            item.route = 'Form/' + item.doctype;
                        } else {
                            if (item.filters) {
                                frappe.route_options=item.filters;
                            }
                            item.route="List/" + item.doctype;
                            //item.style = 'font-weight: 500;';
                        }
                        // item.style = 'font-weight: bold;';
                    }
                    else if(item.type==="report" && item.is_query_report) {
                        item.route="query-report/" + item.name;
                    }
                    else if(item.type==="report") {
                        item.route="Report/" + item.doctype + "/" + item.name;
                    }
                    else if(item.type==="page") {
                        item.route=item.name;
                    }
                }

                if(item.route_options) {
                    item.route += "?" + $.map(item.route_options, function(value, key) {
                        return encodeURIComponent(key) + "=" + encodeURIComponent(value); }).join('&');
                }

                if(item.type==="page" || item.type==="help" || item.type==="report" ||
                (item.doctype && frappe.model.can_read(item.doctype))) {
                    item.shown = true;
                }
            });
        });
    };





jQuery(document).ready(function($) {
    $("a.navbar-brand.navbar-home").html(frappe.render_template("awesome_logo"));
    $("#ivm-mega-menu-items").html(get_sidebar_html());
    var dsa = show_section();
    $("#ivm-mega-menu-items").menuAim({
        activate: function(a){
            var idx = $(a).index();
            $('.ivm-mega-menu-panel').eq(idx).show();
            $("#ivm-mega-menu-items > li").eq(idx).addClass('ivm-hover');
        },  // fired on row activation
        deactivate: function(a){
            var idx = $(a).index();
            $('.ivm-mega-menu-panel').eq(idx).hide();
            $("#ivm-mega-menu-items > li").eq(idx).removeClass('ivm-hover');
        }  // fired on row deactivation
    });

    /*
    *   Menu modes
    */
    var ivm_mode = $('#ivm-mega-menu-button').data("menu-mode");
    if(ivm_mode == "hover") {
        $('#ivm-mega-menu-button, #ivm-mega-menu-wrapper, #ivm-mega-menu').hover(function() {
            $('#ivm-mega-menu-wrapper').show();
        }, function() {
            $('#ivm-mega-menu-wrapper').hide();
        });
    }else if (ivm_mode == "click") {
        $('#ivm-mega-menu-button').click(function() {
            $('#ivm-mega-menu-wrapper').toggleClass('ivm-active');
            $(this).toggleClass('ivm-active');
        });
    }

    /*
    *   Responsive Menu
    */
    $('#ivm-mega-menu-mobile-button').click(function() {
        $('#ivm-mega-menu-wrapper').toggleClass('ivm-active');
        $('.ivm-mm-item-mobile').removeClass('ivm-active');
    });
    $('.ivm-mm-item-mobile').click(function() {
        $('.ivm-mm-item-mobile').removeClass('ivm-active');
        $(this).addClass('ivm-active');
    });

});

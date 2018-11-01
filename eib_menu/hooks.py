# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from . import __version__ as app_version

app_name = "eib_menu"
app_title = "EIB Customized Menu"
app_publisher = "Tai Tran"
app_description = "A horizontal menu"
app_icon = "octicon octicon-file-directory"
app_color = "grey"
app_email = "hongtai91@gmail.com"
app_license = "MIT"

# Includes in <head> 
# ------------------
app_include_css = [
    "/assets/eib_menu/css/ivm.mega-menu.css",
    "/assets/eib_menu/css/uikit.css"
]
app_include_js = [
    "/assets/eib_menu/js/modernizr.js",
]


# include js, css files in header of desk.html 
# app_include_css = "/assets/eib_menu/css/eib_menu.css"
app_include_js = "/assets/eib_menu/js/ivm.mega-menu.js"

# include js, css files in header of web template
# web_include_css = "/assets/eib_menu/css/eib_menu.css"
# web_include_js = "/assets/eib_menu/js/eib_menu.js"

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Website user home page (by function)
# get_website_user_home_page = "eib_menu.utils.get_home_page"

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Installation
# ------------

# before_install = "eib_menu.install.before_install"
# after_install = "eib_menu.install.after_install"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "eib_menu.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
#	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"eib_menu.tasks.all"
# 	],
# 	"daily": [
# 		"eib_menu.tasks.daily"
# 	],
# 	"hourly": [
# 		"eib_menu.tasks.hourly"
# 	],
# 	"weekly": [
# 		"eib_menu.tasks.weekly"
# 	]
# 	"monthly": [
# 		"eib_menu.tasks.monthly"
# 	]
# }

# Testing
# -------

# before_tests = "eib_menu.install.before_tests"

# Overriding Whitelisted Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "eib_menu.event.get_events"
# }


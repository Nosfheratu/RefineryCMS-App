var create_sortable_list=function(s){return ordered_list={initialised:!1,init:function(s){return this.initialised||(this.update_url=s.update_url,this.sortable_list=s.sortable_list,this.tree=s.tree,this.replaceContentsAfterUpdate=s.replaceContentsAfterUpdate,this.div_with_list_and_actions=this.sortable_list.parents().filter(function(){return $(this).children("#actions").length>0}),this.actions=$("#actions",this.div_with_list_and_actions),this.reorder_action=$("#reorder_action",this.actions),this.reorder_action_done=$("#reorder_action_done",this.actions),this.sortable_list.addClass("sortable_list"),this.reorder_action.click($.proxy(this.enable_reordering,{list:this})),this.reorder_action_done.click($.proxy(this.disable_reordering,{list:this})),0==this.tree&&this.sortable_list.find("li").addClass("no-nest"),this.sortable_list.nestedSortable({listType:"ul",disableNesting:"no-nest",forcePlaceholderSize:!0,handle:this.tree?"div":null,items:"li",opacity:.6,placeholder:"placeholder",tabSize:25,tolerance:"pointer",toleranceElement:this.tree?"> div":null,disabled:!0,start:function(){},change:$.proxy(this.change,{list:this}),stop:$.proxy(this.stop,{list:this})}),this.tree?this.reset_branch_classes(this.sortable_list):this.reset_on_off_classes(this.sortable_list),this.initialised=!0),this},stop:function(){this.list.reset_classes()},change:function(){this.list.tree&&this.list.reset_branch_classes(this.list.sortable_list)},reset_classes:function(){this.tree?(this.reset_branch_classes(this.sortable_list),this.reset_icon_classes(this.sortable_list)):this.reset_on_off_classes(this.sortable_list)},reset_on_off_classes:function(s){$("> li",s).each(function(s,t){$(t).removeClass("on off on-hover").addClass(0===s%2?"on":"off")})},reset_branch_classes:function(s){$("li.ui-sortable-helper",this).removeClass("record").removeClass("branch_start").removeClass("branch_end"),$("li",s).removeClass("branch_start").removeClass("branch_end"),$("> li:first",s).addClass("branch_start"),$("> li:last",s).addClass("branch_end");var t=$("ul",s);$("> li:last",t).addClass("branch_end")},reset_icon_classes:function(s){$("li",s).each(function(){var s=$(this),t=s.find(".icon:first");s.find("ul li").size()>0?t.addClass("toggle expanded"):t.hasClass("expanded")&&t.removeClass("toggle expanded")})},enable_reordering:function(s){s&&s.preventDefault(),this.list.sortable_list.addClass("reordering"),$(".actions",this.list.sortable_list).fadeTo(500,.3),this.list.div_with_list_and_actions.parents().siblings("div").fadeTo(500,.3),$('*:not("#reorder_action_done, #reorder_action")',this.list.actions).not(this.list.reorder_action_done.parents("li, ul, div")).fadeTo(500,.55),this.list.sortable_list.nestedSortable("enable"),this.list.reorder_action.hide(),this.list.reorder_action_done.show()},disable_reordering:function(s){if(s&&s.preventDefault(),this.list.reorder_action_done.hasClass("loading"))return!1;if(this.list.reorder_action_done.addClass("loading"),this.list.sortable_list.nestedSortable("disable"),this.list.sortable_list.removeClass("reordering"),null!==this.list.update_url){var t=this.list.sortable_list.serializelist();$.post(this.list.update_url,t,$.proxy(this.list.restore_controls,{list:this.list}))}else $.proxy(this.list.restore_controls,{list:this.list})()},restore_controls:function(s){this.list.sortable_list.removeClass("reordering"),$(".actions",this.list.sortable_list).fadeTo(250,1),this.list.div_with_list_and_actions.parents().siblings("div").fadeTo(250,1),$('*:not("#reorder_action_done, #reorder_action")',this.list.actions).not($("#reorder_action_done").parents("li, ul, div")).fadeTo(250,1),this.list.reorder_action_done.hide().removeClass("loading"),this.list.reorder_action.show(),this.list.replaceContentsAfterUpdate&&(this.list.sortable_list.children().remove(),this.list.sortable_list.append($(s).children()),this.list.reset_classes())}},ordered_list.init(s),ordered_list};
﻿/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataResourceCollectionRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/List.js"/>

Ext.namespace("Mobile.SalesLogix.Opportunity");

Mobile.SalesLogix.Opportunity.List = Ext.extend(Sage.Platform.Mobile.List, {   
    itemTemplate: new Simplate([
        '<li>',
        '<a href="#opportunity_detail" target="_detail" m:key="{%= $key %}" m:descriptor="{%: $descriptor %}">',
        '<h3>{%= $["Description"] %}</h3>',
        '<h4>{%= $["Account"]["AccountName"] %}</h4>',
        '</a>',
        '</li>'
    ]),       
    constructor: function(o) {
        Mobile.SalesLogix.Opportunity.List.superclass.constructor.call(this);        
        
        Ext.apply(this, o, {
            id: 'opportunity_list',
            title: 'Opportunities',
            resourceKind: 'opportunities',
            pageSize: 10,
            icon: 'products/slx/images/Opportunity_List_24x24.gif'
        });
    },   
    formatSearchQuery: function(query) {
        return String.format('(Description like "%{0}%")', query);

        // todo: The below does not currently work as the dynamic SData adapter does not support dotted notation for queries
        //       except in certain situations.  Support for general dotted notation is being worked on.
        //return String.format('(Description like "%{0}%" or Account.AccountName like "%{0}%")', query);
    },
    createRequest: function() {
        var request = Mobile.SalesLogix.Opportunity.List.superclass.createRequest.call(this);

        request           
            .setQueryArgs({
                'include': 'Account',
                'orderby': 'Description',
                'select': 'Description,Account/AccountName'                             
            });

        return request;
    }
});
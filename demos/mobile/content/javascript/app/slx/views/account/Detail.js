﻿/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataSingleResourceRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/Detail.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Account");

Mobile.SalesLogix.Account.Detail = Ext.extend(Sage.Platform.Mobile.Detail, {       
    constructor: function(o) {
        Mobile.SalesLogix.Account.Detail.superclass.constructor.call(this);        
        
        Ext.apply(this, o, {
            id: 'account_detail',
            title: 'Account',
            expose: false
        });

        this.layout = [
            {name: 'AccountName', label: 'name'},
            {name: 'MainPhone', label: 'phone', renderer: Mobile.SalesLogix.Format.phone},
            {name: 'Address', label: 'address', renderer: Mobile.SalesLogix.Format.address},
            {name: 'WebAddress', label: 'web', renderer: Mobile.SalesLogix.Format.link},
            {name: 'Type', label: 'type'},
            {name: 'SubType', label: 'sub-type'}, 
            {name: 'AccountManager.UserInfo', label: 'acct mgr', tpl: Mobile.SalesLogix.Template.nameLF},
            {name: 'Owner.OwnerDescription', label: 'owner'},
            {name: 'Status', label: 'status'},
            {name: 'CreateDate', label: 'create date'},
            {name: 'CreateUser', label: 'create user'}
        ];
    },
    init: function() {     
        Mobile.SalesLogix.Account.Detail.superclass.init.call(this);   
    },
    createRequest: function() {
        return new Sage.SData.Client.SDataSingleResourceRequest(this.getService())            
            .setResourceKind('accounts')
            .setQueryArgs({
                'include': 'Address,AccountManager,AccountManager/UserInfo,Owner',
                'select': [
                    'AccountName',
                    'MainPhone',
                    'Address/*',
                    'WebAddress',
                    'Type',
                    'SubType',
                    'AccountManager/UserInfo/FirstName',
                    'AccountManager/UserInfo/LastName',
                    'Owner/OwnerDescription',
                    'Status',
                    'CreateDate',
                    'CreateUser'
                ].join(',')                  
            })
            .setResourceSelector("'" + this.context.key + "'");
    } 
});
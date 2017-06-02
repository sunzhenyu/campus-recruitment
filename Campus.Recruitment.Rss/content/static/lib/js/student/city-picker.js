var jQuery = $;
(function(a) {
    a.fn.extend({
        city_picker: function(m) {
            var t = [{
                    id: 1,
                    items: [{ id: 1001, items: null, name: "\u5317\u4eac", pid: 1 }, { id: 1003, items: null, name: "\u4e0a\u6d77", pid: 1 }, { id: 2016001, items: null, name: "\u5e7f\u5dde", pid: 2016 }, { id: 2016003, items: null, name: "\u6df1\u5733", pid: 2016 }, { id: 2007001, items: null, name: "\u5357\u4eac", pid: 2007 }, { id: 2014001, items: null, name: "\u6b66\u6c49", pid: 2014 }, { id: 2023001, items: null, name: "\u897f\u5b89", pid: 2023 }, { id: 2008001, items: null, name: "\u676d\u5dde", pid: 2008 }, {
                        id: 1002,
                        items: null,
                        name: "\u5929\u6d25",
                        pid: 1
                    }, { id: 1004, items: null, name: "\u91cd\u5e86", pid: 1 }],
                    name: "\u70ed\u95e8\u57ce\u5e02",
                    pid: 0
                }],
                k = [{
                    id: 2,
                    items: [{
                        id: 2016,
                        items: [{ id: 2016001, items: null, name: "\u5e7f\u5dde", pid: 2016 }, { id: 2016002, items: null, name: "\u97f6\u5173", pid: 2016 }, { id: 2016003, items: null, name: "\u6df1\u5733", pid: 2016 }, { id: 2016004, items: null, name: "\u73e0\u6d77", pid: 2016 }, { id: 2016005, items: null, name: "\u6c55\u5934", pid: 2016 }, { id: 2016006, items: null, name: "\u4f5b\u5c71", pid: 2016 }, {
                            id: 2016007,
                            items: null,
                            name: "\u6c5f\u95e8",
                            pid: 2016
                        }, { id: 2016008, items: null, name: "\u6e5b\u6c5f", pid: 2016 }, { id: 2016009, items: null, name: "\u8302\u540d", pid: 2016 }, { id: 2016010, items: null, name: "\u8087\u5e86", pid: 2016 }, { id: 2016011, items: null, name: "\u60e0\u5dde", pid: 2016 }, { id: 2016012, items: null, name: "\u6885\u5dde", pid: 2016 }, { id: 2016013, items: null, name: "\u6c55\u5c3e", pid: 2016 }, { id: 2016014, items: null, name: "\u6cb3\u6e90", pid: 2016 }, { id: 2016015, items: null, name: "\u9633\u6c5f", pid: 2016 }, { id: 2016016, items: null, name: "\u6e05\u8fdc", pid: 2016 }, {
                            id: 2016017,
                            items: null,
                            name: "\u4e1c\u839e",
                            pid: 2016
                        }, { id: 2016018, items: null, name: "\u4e2d\u5c71", pid: 2016 }, { id: 2016019, items: null, name: "\u6f6e\u5dde", pid: 2016 }, { id: 2016020, items: null, name: "\u63ed\u9633", pid: 2016 }, { id: 2016021, items: null, name: "\u4e91\u6d6e", pid: 2016 }, { id: 2016022, items: null, name: "\u987a\u5fb7", pid: 2016 }, { id: 2016023, items: null, name: "\u5f00\u5e73", pid: 2016 }],
                        name: "\u5e7f\u4e1c",
                        pid: 2
                    }, {
                        id: 2007,
                        items: [{ id: 2007001, items: null, name: "\u5357\u4eac", pid: 2007 }, { id: 2007002, items: null, name: "\u65e0\u9521", pid: 2007 }, {
                            id: 2007003,
                            items: null,
                            name: "\u5f90\u5dde",
                            pid: 2007
                        }, { id: 2007004, items: null, name: "\u5e38\u5dde", pid: 2007 }, { id: 2007005, items: null, name: "\u82cf\u5dde", pid: 2007 }, { id: 2007006, items: null, name: "\u6606\u5c71", pid: 2007 }, { id: 2007007, items: null, name: "\u5357\u901a", pid: 2007 }, { id: 2007008, items: null, name: "\u8fde\u4e91\u6e2f", pid: 2007 }, { id: 2007009, items: null, name: "\u6dee\u5b89", pid: 2007 }, { id: 2007010, items: null, name: "\u76d0\u57ce", pid: 2007 }, { id: 2007011, items: null, name: "\u626c\u5dde", pid: 2007 }, {
                            id: 2007012,
                            items: null,
                            name: "\u9547\u6c5f",
                            pid: 2007
                        }, { id: 2007013, items: null, name: "\u6cf0\u5dde", pid: 2007 }, { id: 2007014, items: null, name: "\u5bbf\u8fc1", pid: 2007 }, { id: 2007015, items: null, name: "\u9756\u6c5f", pid: 2007 }, { id: 2007016, items: null, name: "\u5e38\u719f", pid: 2007 }, { id: 2007017, items: null, name: "\u6c5f\u9634", pid: 2007 }, { id: 2007018, items: null, name: "\u5f20\u5bb6\u6e2f", pid: 2007 }, { id: 2007019, items: null, name: "\u592a\u4ed3\u5e02", pid: 2007 }, { id: 2007020, items: null, name: "\u5434\u6c5f", pid: 2007 }, { id: 2007021, items: null, name: "\u4e39\u9633", pid: 2007 }, {
                            id: 2007022,
                            items: null,
                            name: "\u6ea7\u9633",
                            pid: 2007
                        }, { id: 2007023, items: null, name: "\u6cf0\u5174", pid: 2007 }, { id: 2007024, items: null, name: "\u5b9c\u5174", pid: 2007 }],
                        name: "\u6c5f\u82cf",
                        pid: 2
                    }, {
                        id: 2008,
                        items: [{ id: 2008001, items: null, name: "\u676d\u5dde", pid: 2008 }, { id: 2008002, items: null, name: "\u5b81\u6ce2", pid: 2008 }, { id: 2008003, items: null, name: "\u6e29\u5dde", pid: 2008 }, { id: 2008004, items: null, name: "\u5609\u5174", pid: 2008 }, { id: 2008005, items: null, name: "\u6e56\u5dde", pid: 2008 }, { id: 2008006, items: null, name: "\u7ecd\u5174", pid: 2008 },
                            { id: 2008007, items: null, name: "\u91d1\u534e", pid: 2008 }, { id: 2008008, items: null, name: "\u8862\u5dde", pid: 2008 }, { id: 2008009, items: null, name: "\u821f\u5c71", pid: 2008 }, { id: 2008010, items: null, name: "\u53f0\u5dde", pid: 2008 }, { id: 2008011, items: null, name: "\u4e3d\u6c34", pid: 2008 }, { id: 2008012, items: null, name: "\u7389\u73af\u53bf", pid: 2008 }, { id: 2008013, items: null, name: "\u65b9\u5bb6\u5c71", pid: 2008 }, { id: 2008014, items: null, name: "\u8427\u5c71", pid: 2008 }, { id: 2008015, items: null, name: "\u4e49\u4e4c", pid: 2008 }, {
                                id: 2008016,
                                items: null,
                                name: "\u6148\u6eaa",
                                pid: 2008
                            }, { id: 2008017, items: null, name: "\u6d77\u5b81", pid: 2008 }
                        ],
                        name: "\u6d59\u6c5f",
                        pid: 2
                    }, {
                        id: 2012,
                        items: [{ id: 2012001, items: null, name: "\u6d4e\u5357", pid: 2012 }, { id: 2012002, items: null, name: "\u9752\u5c9b", pid: 2012 }, { id: 2012003, items: null, name: "\u6dc4\u535a", pid: 2012 }, { id: 2012004, items: null, name: "\u67a3\u5e84", pid: 2012 }, { id: 2012005, items: null, name: "\u4e1c\u8425", pid: 2012 }, { id: 2012006, items: null, name: "\u70df\u53f0", pid: 2012 }, { id: 2012007, items: null, name: "\u6f4d\u574a", pid: 2012 },
                            { id: 2012008, items: null, name: "\u6d4e\u5b81", pid: 2012 }, { id: 2012009, items: null, name: "\u6cf0\u5b89", pid: 2012 }, { id: 2012010, items: null, name: "\u5a01\u6d77", pid: 2012 }, { id: 2012011, items: null, name: "\u65e5\u7167", pid: 2012 }, { id: 2012012, items: null, name: "\u83b1\u829c", pid: 2012 }, { id: 2012013, items: null, name: "\u4e34\u6c82", pid: 2012 }, { id: 2012014, items: null, name: "\u5fb7\u5dde", pid: 2012 }, { id: 2012015, items: null, name: "\u804a\u57ce", pid: 2012 }, { id: 2012016, items: null, name: "\u6ee8\u5dde", pid: 2012 }, {
                                id: 2012017,
                                items: null,
                                name: "\u83cf\u6cfd",
                                pid: 2012
                            }, { id: 2012018, items: null, name: "\u7ae0\u4e18\u5e02", pid: 2012 }, { id: 2012019, items: null, name: "\u8363\u6210", pid: 2012 }
                        ],
                        name: "\u5c71\u4e1c",
                        pid: 2
                    }, {
                        id: 2023,
                        items: [{ id: 2023001, items: null, name: "\u897f\u5b89", pid: 2023 }, { id: 2023002, items: null, name: "\u94dc\u5ddd", pid: 2023 }, { id: 2023003, items: null, name: "\u5b9d\u9e21", pid: 2023 }, { id: 2023004, items: null, name: "\u54b8\u9633", pid: 2023 }, { id: 2023005, items: null, name: "\u6e2d\u5357", pid: 2023 }, { id: 2023006, items: null, name: "\u5ef6\u5b89", pid: 2023 }, {
                            id: 2023007,
                            items: null,
                            name: "\u6c49\u4e2d",
                            pid: 2023
                        }, { id: 2023008, items: null, name: "\u6986\u6797", pid: 2023 }, { id: 2023009, items: null, name: "\u5b89\u5eb7", pid: 2023 }, { id: 2023010, items: null, name: "\u5546\u6d1b", pid: 2023 }, { id: 2023011, items: null, name: "\u6768\u51cc", pid: 2023 }],
                        name: "\u9655\u897f",
                        pid: 2
                    }, {
                        id: 2019,
                        items: [{ id: 2019001, items: null, name: "\u6210\u90fd", pid: 2019 }, { id: 2019002, items: null, name: "\u81ea\u8d21", pid: 2019 }, { id: 2019003, items: null, name: "\u6500\u679d\u82b1", pid: 2019 }, { id: 2019004, items: null, name: "\u6cf8\u5dde", pid: 2019 },
                            { id: 2019005, items: null, name: "\u5fb7\u9633", pid: 2019 }, { id: 2019006, items: null, name: "\u7ef5\u9633", pid: 2019 }, { id: 2019007, items: null, name: "\u5e7f\u5143", pid: 2019 }, { id: 2019008, items: null, name: "\u9042\u5b81", pid: 2019 }, { id: 2019009, items: null, name: "\u5185\u6c5f", pid: 2019 }, { id: 2019010, items: null, name: "\u4e50\u5c71", pid: 2019 }, { id: 2019011, items: null, name: "\u5357\u5145", pid: 2019 }, { id: 2019012, items: null, name: "\u7709\u5c71", pid: 2019 }, { id: 2019013, items: null, name: "\u5b9c\u5bbe", pid: 2019 }, {
                                id: 2019014,
                                items: null,
                                name: "\u5e7f\u5b89",
                                pid: 2019
                            }, { id: 2019015, items: null, name: "\u8fbe\u5dde", pid: 2019 }, { id: 2019016, items: null, name: "\u96c5\u5b89", pid: 2019 }, { id: 2019017, items: null, name: "\u5df4\u4e2d", pid: 2019 }, { id: 2019018, items: null, name: "\u8d44\u9633", pid: 2019 }, { id: 2019019, items: null, name: "\u897f\u660c", pid: 2019 }, { id: 2019020, items: null, name: "\u963f\u575d", pid: 2019 }, { id: 2019021, items: null, name: "\u7518\u5b5c", pid: 2019 }, { id: 2019022, items: null, name: "\u51c9\u5c71", pid: 2019 }
                        ],
                        name: "\u56db\u5ddd",
                        pid: 2
                    }, {
                        id: 2014,
                        items: [{
                                id: 2014001,
                                items: null,
                                name: "\u6b66\u6c49",
                                pid: 2014
                            }, { id: 2014002, items: null, name: "\u9ec4\u77f3", pid: 2014 }, { id: 2014003, items: null, name: "\u5341\u5830", pid: 2014 }, { id: 2014004, items: null, name: "\u5b9c\u660c", pid: 2014 }, { id: 2014005, items: null, name: "\u8944\u9633", pid: 2014 }, { id: 2014006, items: null, name: "\u9102\u5dde", pid: 2014 }, { id: 2014007, items: null, name: "\u8346\u95e8", pid: 2014 }, { id: 2014008, items: null, name: "\u5b5d\u611f", pid: 2014 }, { id: 2014009, items: null, name: "\u8346\u5dde", pid: 2014 }, { id: 2014010, items: null, name: "\u9ec4\u5188", pid: 2014 },
                            { id: 2014011, items: null, name: "\u54b8\u5b81", pid: 2014 }, { id: 2014012, items: null, name: "\u968f\u5dde", pid: 2014 }, { id: 2014013, items: null, name: "\u4ed9\u6843", pid: 2014 }, { id: 2014014, items: null, name: "\u6f5c\u6c5f", pid: 2014 }, { id: 2014015, items: null, name: "\u5929\u95e8", pid: 2014 }, { id: 2014016, items: null, name: "\u795e\u519c\u67b6", pid: 2014 }, { id: 2014017, items: null, name: "\u6069\u65bd", pid: 2014 }
                        ],
                        name: "\u6e56\u5317",
                        pid: 2
                    }, {
                        id: 2015,
                        items: [{ id: 2015001, items: null, name: "\u957f\u6c99", pid: 2015 }, {
                            id: 2015002,
                            items: null,
                            name: "\u682a\u6d32",
                            pid: 2015
                        }, { id: 2015003, items: null, name: "\u6e58\u6f6d", pid: 2015 }, { id: 2015004, items: null, name: "\u8861\u9633", pid: 2015 }, { id: 2015005, items: null, name: "\u90b5\u9633", pid: 2015 }, { id: 2015006, items: null, name: "\u5cb3\u9633", pid: 2015 }, { id: 2015007, items: null, name: "\u5e38\u5fb7", pid: 2015 }, { id: 2015008, items: null, name: "\u5f20\u5bb6\u754c", pid: 2015 }, { id: 2015009, items: null, name: "\u76ca\u9633", pid: 2015 }, { id: 2015010, items: null, name: "\u90f4\u5dde", pid: 2015 }, { id: 2015011, items: null, name: "\u6c38\u5dde", pid: 2015 }, {
                            id: 2015012,
                            items: null,
                            name: "\u6000\u5316",
                            pid: 2015
                        }, { id: 2015013, items: null, name: "\u5a04\u5e95", pid: 2015 }, { id: 2015014, items: null, name: "\u6e58\u897f", pid: 2015 }],
                        name: "\u6e56\u5357",
                        pid: 2
                    }, {
                        id: 2001,
                        items: [{ id: 2001001, items: null, name: "\u77f3\u5bb6\u5e84", pid: 2001 }, { id: 2001002, items: null, name: "\u5510\u5c71", pid: 2001 }, { id: 2001003, items: null, name: "\u79e6\u7687\u5c9b", pid: 2001 }, { id: 2001004, items: null, name: "\u90af\u90f8", pid: 2001 }, { id: 2001005, items: null, name: "\u90a2\u53f0", pid: 2001 }, {
                            id: 2001006,
                            items: null,
                            name: "\u4fdd\u5b9a",
                            pid: 2001
                        }, { id: 2001007, items: null, name: "\u5f20\u5bb6\u53e3", pid: 2001 }, { id: 2001008, items: null, name: "\u627f\u5fb7", pid: 2001 }, { id: 2001009, items: null, name: "\u6ca7\u5dde", pid: 2001 }, { id: 2001010, items: null, name: "\u5eca\u574a", pid: 2001 }, { id: 2001011, items: null, name: "\u8861\u6c34", pid: 2001 }],
                        name: "\u6cb3\u5317",
                        pid: 2
                    }, {
                        id: 2013,
                        items: [{ id: 2013001, items: null, name: "\u90d1\u5dde", pid: 2013 }, { id: 2013002, items: null, name: "\u5f00\u5c01", pid: 2013 }, { id: 2013003, items: null, name: "\u6d1b\u9633", pid: 2013 }, {
                            id: 2013004,
                            items: null,
                            name: "\u5e73\u9876\u5c71",
                            pid: 2013
                        }, { id: 2013005, items: null, name: "\u5b89\u9633", pid: 2013 }, { id: 2013006, items: null, name: "\u9e64\u58c1", pid: 2013 }, { id: 2013007, items: null, name: "\u65b0\u4e61", pid: 2013 }, { id: 2013008, items: null, name: "\u7126\u4f5c", pid: 2013 }, { id: 2013009, items: null, name: "\u6fee\u9633", pid: 2013 }, { id: 2013010, items: null, name: "\u8bb8\u660c", pid: 2013 }, { id: 2013011, items: null, name: "\u6f2f\u6cb3", pid: 2013 }, { id: 2013012, items: null, name: "\u4e09\u95e8\u5ce1", pid: 2013 }, {
                            id: 2013013,
                            items: null,
                            name: "\u5357\u9633",
                            pid: 2013
                        }, { id: 2013014, items: null, name: "\u5546\u4e18", pid: 2013 }, { id: 2013015, items: null, name: "\u4fe1\u9633", pid: 2013 }, { id: 2013016, items: null, name: "\u5468\u53e3", pid: 2013 }, { id: 2013017, items: null, name: "\u9a7b\u9a6c\u5e97", pid: 2013 }, { id: 2013018, items: null, name: "\u6d4e\u6e90", pid: 2013 }],
                        name: "\u6cb3\u5357",
                        pid: 2
                    }, {
                        id: 2010,
                        items: [{ id: 2010001, items: null, name: "\u798f\u5dde", pid: 2010 }, { id: 2010002, items: null, name: "\u53a6\u95e8", pid: 2010 }, { id: 2010003, items: null, name: "\u8386\u7530", pid: 2010 }, {
                            id: 2010004,
                            items: null,
                            name: "\u4e09\u660e",
                            pid: 2010
                        }, { id: 2010005, items: null, name: "\u6cc9\u5dde", pid: 2010 }, { id: 2010006, items: null, name: "\u6cc9\u6e2f\u533a", pid: 2010 }, { id: 2010007, items: null, name: "\u6f33\u5dde", pid: 2010 }, { id: 2010008, items: null, name: "\u5357\u5e73", pid: 2010 }, { id: 2010009, items: null, name: "\u9f99\u5ca9", pid: 2010 }, { id: 2010010, items: null, name: "\u5b81\u5fb7", pid: 2010 }],
                        name: "\u798f\u5efa",
                        pid: 2
                    }, {
                        id: 2009,
                        items: [{ id: 2009001, items: null, name: "\u5408\u80a5", pid: 2009 }, { id: 2009002, items: null, name: "\u829c\u6e56", pid: 2009 },
                            { id: 2009003, items: null, name: "\u868c\u57e0", pid: 2009 }, { id: 2009004, items: null, name: "\u6dee\u5357", pid: 2009 }, { id: 2009005, items: null, name: "\u9a6c\u978d\u5c71", pid: 2009 }, { id: 2009006, items: null, name: "\u6dee\u5317", pid: 2009 }, { id: 2009007, items: null, name: "\u94dc\u9675", pid: 2009 }, { id: 2009008, items: null, name: "\u5b89\u5e86", pid: 2009 }, { id: 2009009, items: null, name: "\u9ec4\u5c71", pid: 2009 }, { id: 2009010, items: null, name: "\u6ec1\u5dde", pid: 2009 }, { id: 2009011, items: null, name: "\u961c\u9633", pid: 2009 }, {
                                id: 2009012,
                                items: null,
                                name: "\u5bbf\u5dde",
                                pid: 2009
                            }, { id: 2009013, items: null, name: "\u5de2\u6e56", pid: 2009 }, { id: 2009014, items: null, name: "\u516d\u5b89", pid: 2009 }, { id: 2009015, items: null, name: "\u4eb3\u5dde", pid: 2009 }, { id: 2009016, items: null, name: "\u6c60\u5dde", pid: 2009 }, { id: 2009017, items: null, name: "\u5ba3\u57ce", pid: 2009 }
                        ],
                        name: "\u5b89\u5fbd",
                        pid: 2
                    }, {
                        id: 2002,
                        items: [{ id: 2002001, items: null, name: "\u592a\u539f", pid: 2002 }, { id: 2002002, items: null, name: "\u5927\u540c", pid: 2002 }, { id: 2002003, items: null, name: "\u9633\u6cc9", pid: 2002 }, {
                            id: 2002004,
                            items: null,
                            name: "\u957f\u6cbb",
                            pid: 2002
                        }, { id: 2002005, items: null, name: "\u664b\u57ce", pid: 2002 }, { id: 2002006, items: null, name: "\u6714\u5dde", pid: 2002 }, { id: 2002007, items: null, name: "\u664b\u4e2d", pid: 2002 }, { id: 2002008, items: null, name: "\u8fd0\u57ce", pid: 2002 }, { id: 2002009, items: null, name: "\u5ffb\u5dde", pid: 2002 }, { id: 2002010, items: null, name: "\u4e34\u6c7e", pid: 2002 }, { id: 2002011, items: null, name: "\u5415\u6881", pid: 2002 }, { id: 2002012, items: null, name: "\u6c38\u6d4e\u5e02", pid: 2002 }],
                        name: "\u5c71\u897f",
                        pid: 2
                    }, {
                        id: 2011,
                        items: [{ id: 2011001, items: null, name: "\u5357\u660c", pid: 2011 }, { id: 2011002, items: null, name: "\u666f\u5fb7\u9547", pid: 2011 }, { id: 2011003, items: null, name: "\u840d\u4e61", pid: 2011 }, { id: 2011004, items: null, name: "\u4e5d\u6c5f", pid: 2011 }, { id: 2011005, items: null, name: "\u65b0\u4f59", pid: 2011 }, { id: 2011006, items: null, name: "\u9e70\u6f6d", pid: 2011 }, { id: 2011007, items: null, name: "\u8d63\u5dde", pid: 2011 }, { id: 2011008, items: null, name: "\u5409\u5b89", pid: 2011 }, { id: 2011009, items: null, name: "\u5b9c\u6625", pid: 2011 }, {
                            id: 2011010,
                            items: null,
                            name: "\u629a\u5dde",
                            pid: 2011
                        }, { id: 2011011, items: null, name: "\u4e0a\u9976", pid: 2011 }],
                        name: "\u6c5f\u897f",
                        pid: 2
                    }, {
                        id: 2020,
                        items: [{ id: 2020001, items: null, name: "\u8d35\u9633", pid: 2020 }, { id: 2020002, items: null, name: "\u516d\u76d8\u6c34", pid: 2020 }, { id: 2020003, items: null, name: "\u9075\u4e49", pid: 2020 }, { id: 2020004, items: null, name: "\u5b89\u987a", pid: 2020 }, { id: 2020005, items: null, name: "\u94dc\u4ec1\u5730\u533a", pid: 2020 }, { id: 2020006, items: null, name: "\u9ed4\u897f\u5357", pid: 2020 }, {
                            id: 2020007,
                            items: null,
                            name: "\u6bd5\u8282\u5730\u533a",
                            pid: 2020
                        }, { id: 2020008, items: null, name: "\u9ed4\u4e1c\u5357", pid: 2020 }, { id: 2020009, items: null, name: "\u9ed4\u5357", pid: 2020 }],
                        name: "\u8d35\u5dde",
                        pid: 2
                    }, {
                        id: 2004,
                        items: [{ id: 2004001, items: null, name: "\u6c88\u9633", pid: 2004 }, { id: 2004002, items: null, name: "\u5927\u8fde", pid: 2004 }, { id: 2004003, items: null, name: "\u978d\u5c71", pid: 2004 }, { id: 2004004, items: null, name: "\u629a\u987a", pid: 2004 }, { id: 2004005, items: null, name: "\u672c\u6eaa", pid: 2004 }, {
                            id: 2004006,
                            items: null,
                            name: "\u4e39\u4e1c",
                            pid: 2004
                        }, { id: 2004007, items: null, name: "\u9526\u5dde", pid: 2004 }, { id: 2004008, items: null, name: "\u8425\u53e3", pid: 2004 }, { id: 2004009, items: null, name: "\u961c\u65b0", pid: 2004 }, { id: 2004010, items: null, name: "\u8fbd\u9633", pid: 2004 }, { id: 2004011, items: null, name: "\u76d8\u9526", pid: 2004 }, { id: 2004012, items: null, name: "\u94c1\u5cad", pid: 2004 }, { id: 2004013, items: null, name: "\u671d\u9633", pid: 2004 }, { id: 2004014, items: null, name: "\u846b\u82a6\u5c9b", pid: 2004 }],
                        name: "\u8fbd\u5b81",
                        pid: 2
                    }, {
                        id: 2005,
                        items: [{
                            id: 2005001,
                            items: null,
                            name: "\u957f\u6625",
                            pid: 2005
                        }, { id: 2005002, items: null, name: "\u5409\u6797", pid: 2005 }, { id: 2005003, items: null, name: "\u56db\u5e73", pid: 2005 }, { id: 2005004, items: null, name: "\u8fbd\u6e90", pid: 2005 }, { id: 2005005, items: null, name: "\u901a\u5316", pid: 2005 }, { id: 2005006, items: null, name: "\u767d\u5c71", pid: 2005 }, { id: 2005007, items: null, name: "\u677e\u539f", pid: 2005 }, { id: 2005008, items: null, name: "\u767d\u57ce", pid: 2005 }, { id: 2005009, items: null, name: "\u5ef6\u5409", pid: 2005 }, { id: 2005010, items: null, name: "\u5ef6\u8fb9", pid: 2005 }],
                        name: "\u5409\u6797",
                        pid: 2
                    }, {
                        id: 2006,
                        items: [{ id: 2006001, items: null, name: "\u54c8\u5c14\u6ee8", pid: 2006 }, { id: 2006002, items: null, name: "\u9f50\u9f50\u54c8\u5c14", pid: 2006 }, { id: 2006003, items: null, name: "\u9e21\u897f", pid: 2006 }, { id: 2006004, items: null, name: "\u9e64\u5c97", pid: 2006 }, { id: 2006005, items: null, name: "\u53cc\u9e2d\u5c71", pid: 2006 }, { id: 2006006, items: null, name: "\u5927\u5e86", pid: 2006 }, { id: 2006007, items: null, name: "\u4f0a\u6625", pid: 2006 }, { id: 2006008, items: null, name: "\u4f73\u6728\u65af", pid: 2006 }, {
                            id: 2006009,
                            items: null,
                            name: "\u4e03\u53f0\u6cb3",
                            pid: 2006
                        }, { id: 2006010, items: null, name: "\u7261\u4e39\u6c5f", pid: 2006 }, { id: 2006011, items: null, name: "\u9ed1\u6cb3", pid: 2006 }, { id: 2006012, items: null, name: "\u7ee5\u5316", pid: 2006 }, { id: 2006013, items: null, name: "\u5927\u5174\u5b89\u5cad", pid: 2006 }],
                        name: "\u9ed1\u9f99\u6c5f",
                        pid: 2
                    }, {
                        id: 2003,
                        items: [{ id: 2003001, items: null, name: "\u547c\u548c\u6d69\u7279", pid: 2003 }, { id: 2003002, items: null, name: "\u5305\u5934", pid: 2003 }, { id: 2003003, items: null, name: "\u4e4c\u6d77", pid: 2003 }, {
                            id: 2003004,
                            items: null,
                            name: "\u8d64\u5cf0",
                            pid: 2003
                        }, { id: 2003005, items: null, name: "\u901a\u8fbd", pid: 2003 }, { id: 2003006, items: null, name: "\u9102\u5c14\u591a\u65af", pid: 2003 }, { id: 2003007, items: null, name: "\u547c\u4f26\u8d1d\u5c14", pid: 2003 }, { id: 2003008, items: null, name: "\u5174\u5b89\u76df", pid: 2003 }, { id: 2003009, items: null, name: "\u9521\u6797\u90ed\u52d2", pid: 2003 }, { id: 2003010, items: null, name: "\u4e4c\u5170\u5bdf\u5e03", pid: 2003 }, { id: 2003011, items: null, name: "\u5df4\u5f66\u6dd6\u5c14", pid: 2003 }, {
                            id: 2003012,
                            items: null,
                            name: "\u963f\u62c9\u5584\u76df",
                            pid: 2003
                        }],
                        name: "\u5185\u8499\u53e4",
                        pid: 2
                    }, {
                        id: 2024,
                        items: [{ id: 2024001, items: null, name: "\u5170\u5dde", pid: 2024 }, { id: 2024002, items: null, name: "\u5609\u5cea\u5173", pid: 2024 }, { id: 2024003, items: null, name: "\u91d1\u660c", pid: 2024 }, { id: 2024004, items: null, name: "\u767d\u94f6", pid: 2024 }, { id: 2024005, items: null, name: "\u5929\u6c34", pid: 2024 }, { id: 2024006, items: null, name: "\u6b66\u5a01", pid: 2024 }, { id: 2024007, items: null, name: "\u5f20\u6396", pid: 2024 }, {
                            id: 2024008,
                            items: null,
                            name: "\u5e73\u51c9",
                            pid: 2024
                        }, { id: 2024009, items: null, name: "\u9152\u6cc9", pid: 2024 }, { id: 2024010, items: null, name: "\u5e86\u9633", pid: 2024 }, { id: 2024011, items: null, name: "\u5b9a\u897f", pid: 2024 }, { id: 2024012, items: null, name: "\u9647\u5357", pid: 2024 }, { id: 2024013, items: null, name: "\u4e34\u590f", pid: 2024 }, { id: 2024014, items: null, name: "\u7518\u5357", pid: 2024 }],
                        name: "\u7518\u8083",
                        pid: 2
                    }, {
                        id: 2017,
                        items: [{ id: 2017001, items: null, name: "\u5357\u5b81", pid: 2017 }, { id: 2017002, items: null, name: "\u67f3\u5dde", pid: 2017 }, {
                            id: 2017003,
                            items: null,
                            name: "\u6842\u6797",
                            pid: 2017
                        }, { id: 2017004, items: null, name: "\u68a7\u5dde", pid: 2017 }, { id: 2017005, items: null, name: "\u5317\u6d77", pid: 2017 }, { id: 2017006, items: null, name: "\u9632\u57ce\u6e2f", pid: 2017 }, { id: 2017007, items: null, name: "\u94a6\u5dde", pid: 2017 }, { id: 2017008, items: null, name: "\u8d35\u6e2f", pid: 2017 }, { id: 2017009, items: null, name: "\u7389\u6797", pid: 2017 }, { id: 2017010, items: null, name: "\u767e\u8272", pid: 2017 }, { id: 2017011, items: null, name: "\u8d3a\u5dde", pid: 2017 }, {
                            id: 2017012,
                            items: null,
                            name: "\u6cb3\u6c60",
                            pid: 2017
                        }, { id: 2017013, items: null, name: "\u6765\u5bbe", pid: 2017 }, { id: 2017014, items: null, name: "\u5d07\u5de6", pid: 2017 }],
                        name: "\u5e7f\u897f",
                        pid: 2
                    }, {
                        id: 2021,
                        items: [{ id: 2021001, items: null, name: "\u6606\u660e", pid: 2021 }, { id: 2021002, items: null, name: "\u66f2\u9756", pid: 2021 }, { id: 2021003, items: null, name: "\u7389\u6eaa", pid: 2021 }, { id: 2021004, items: null, name: "\u4fdd\u5c71", pid: 2021 }, { id: 2021005, items: null, name: "\u662d\u901a", pid: 2021 }, { id: 2021006, items: null, name: "\u4e34\u6ca7", pid: 2021 }, {
                            id: 2021007,
                            items: null,
                            name: "\u4e3d\u6c5f",
                            pid: 2021
                        }, { id: 2021008, items: null, name: "\u666e\u6d31", pid: 2021 }, { id: 2021009, items: null, name: "\u6587\u5c71", pid: 2021 }, { id: 2021010, items: null, name: "\u897f\u53cc\u7248\u7eb3", pid: 2021 }, { id: 2021011, items: null, name: "\u695a\u96c4", pid: 2021 }, { id: 2021012, items: null, name: "\u7ea2\u6cb3", pid: 2021 }, { id: 2021013, items: null, name: "\u5927\u7406", pid: 2021 }, { id: 2021014, items: null, name: "\u5fb7\u5b8f", pid: 2021 }, { id: 2021015, items: null, name: "\u6012\u6c5f", pid: 2021 }, {
                            id: 2021016,
                            items: null,
                            name: "\u8fea\u5e86",
                            pid: 2021
                        }],
                        name: "\u4e91\u5357",
                        pid: 2
                    }, {
                        id: 2018,
                        items: [{ id: 2018001, items: null, name: "\u6d77\u53e3", pid: 2018 }, { id: 2018002, items: null, name: "\u4e09\u4e9a", pid: 2018 }, { id: 2018003, items: null, name: "\u6587\u660c", pid: 2018 }, { id: 2018004, items: null, name: "\u743c\u6d77", pid: 2018 }, { id: 2018005, items: null, name: "\u4e07\u5b81", pid: 2018 }, { id: 2018006, items: null, name: "\u510b\u5dde", pid: 2018 }, { id: 2018007, items: null, name: "\u4e1c\u65b9", pid: 2018 }, { id: 2018008, items: null, name: "\u4e94\u6307\u5c71", pid: 2018 }, {
                            id: 2018009,
                            items: null,
                            name: "\u6d0b\u6d66\u5e02",
                            pid: 2018
                        }],
                        name: "\u6d77\u5357",
                        pid: 2
                    }, { id: 2026, items: [{ id: 2026001, items: null, name: "\u94f6\u5ddd", pid: 2026 }, { id: 2026002, items: null, name: "\u77f3\u5634\u5c71", pid: 2026 }, { id: 2026003, items: null, name: "\u5434\u5fe0", pid: 2026 }, { id: 2026004, items: null, name: "\u56fa\u539f", pid: 2026 }, { id: 2026005, items: null, name: "\u4e2d\u536b", pid: 2026 }], name: "\u5b81\u590f", pid: 2 }, {
                        id: 2027,
                        items: [{ id: 2027001, items: null, name: "\u4e4c\u9c81\u6728\u9f50", pid: 2027 }, {
                            id: 2027002,
                            items: null,
                            name: "\u514b\u62c9\u739b\u4f9d",
                            pid: 2027
                        }, { id: 2027003, items: null, name: "\u5410\u9c81\u756a", pid: 2027 }, { id: 2027004, items: null, name: "\u54c8\u5bc6\u5730\u533a", pid: 2027 }, { id: 2027005, items: null, name: "\u5580\u4ec0\u5730\u533a", pid: 2027 }, { id: 2027006, items: null, name: "\u548c\u7530", pid: 2027 }, { id: 2027007, items: null, name: "\u77f3\u6cb3\u5b50", pid: 2027 }, { id: 2027008, items: null, name: "\u963f\u62c9\u5c14", pid: 2027 }, { id: 2027009, items: null, name: "\u4e94\u5bb6\u6e20", pid: 2027 }, { id: 2027010, items: null, name: "\u56fe\u6728\u8212\u514b", pid: 2027 }, {
                            id: 2027011,
                            items: null,
                            name: "\u535a\u5c14\u5854\u62c9",
                            pid: 2027
                        }, { id: 2027012, items: null, name: "\u5df4\u97f3\u90ed\u695e", pid: 2027 }, { id: 2027013, items: null, name: "\u963f\u514b\u82cf", pid: 2027 }, { id: 2027014, items: null, name: "\u514b\u5b5c\u52d2\u82cf", pid: 2027 }, { id: 2027015, items: null, name: "\u660c\u5409", pid: 2027 }, { id: 2027016, items: null, name: "\u5854\u57ce\u5730\u533a", pid: 2027 }, { id: 2027017, items: null, name: "\u4f0a\u7281", pid: 2027 }, { id: 2027018, items: null, name: "\u963f\u52d2\u6cf0", pid: 2027 }],
                        name: "\u65b0\u7586",
                        pid: 2
                    }, {
                        id: 2025,
                        items: [{ id: 2025001, items: null, name: "\u897f\u5b81", pid: 2025 }, { id: 2025002, items: null, name: "\u6d77\u4e1c\u5730\u533a", pid: 2025 }, { id: 2025003, items: null, name: "\u6d77\u5317", pid: 2025 }, { id: 2025004, items: null, name: "\u9ec4\u5357", pid: 2025 }, { id: 2025005, items: null, name: "\u6d77\u5357", pid: 2025 }, { id: 2025006, items: null, name: "\u679c\u6d1b", pid: 2025 }, { id: 2025007, items: null, name: "\u7389\u6811", pid: 2025 }, { id: 2025008, items: null, name: "\u6d77\u897f", pid: 2025 }],
                        name: "\u9752\u6d77",
                        pid: 2
                    }, {
                        id: 2022,
                        items: [{
                            id: 2022001,
                            items: null,
                            name: "\u62c9\u8428",
                            pid: 2022
                        }, { id: 2022002, items: null, name: "\u660c\u90fd\u5730\u533a", pid: 2022 }, { id: 2022003, items: null, name: "\u5c71\u5357\u5730\u533a", pid: 2022 }, { id: 2022004, items: null, name: "\u65e5\u5580\u5219", pid: 2022 }, { id: 2022005, items: null, name: "\u90a3\u66f2\u5730\u533a", pid: 2022 }, { id: 2022006, items: null, name: "\u963f\u91cc\u5730\u533a", pid: 2022 }, { id: 2022007, items: null, name: "\u6797\u829d\u5730\u533a", pid: 2022 }],
                        name: "\u897f\u85cf",
                        pid: 2
                    }, { id: 2028, items: null, name: "\u9999\u6e2f", pid: 2 }, {
                        id: 2029,
                        items: null,
                        name: "\u6fb3\u95e8",
                        pid: 2
                    }, { id: 2030, items: null, name: "\u53f0\u6e7e", pid: 2 }, { id: 2099, items: null, name: "\u6d77\u5916", pid: 2 }],
                    name: "\u5176\u4ed6\u7701\u5e02",
                    pid: 0
                }],
                n = !1,
                f = a.extend({}, { trigger: "", inputVal: "", hinput: "", numLimit: 1E4, callback: function() {} }, m);
            return this.each(function() {
                function m(b) {
                    var c;
                    c = a(f.inputVal).val();
                    var d = a(f.hinput).val();
                    c = c.split(",");
                    var d = d.split(","),
                        e = "";
                    if ("" != c[0]) {
                        for (var g = 0; g < c.length; g++) e += '<li data-id="' + d[g] + '" class="city-selected">' + c[g] + "<i></i></li>";
                        c = e } else c =
                        void 0;
                    c = a('<div id="citySelect"><div class="city-list-selected"><p>\u5df2\u9009\u62e9\u57ce\u5e02\uff1a<span class="city-submit">\u786e\u5b9a</span><span class="city-clear">\u6e05\u7a7a</span></p><ul class="city-list">' + c + '</ul><div id="error-in">\u6700\u591a\u9009\u62e95\u4e2a\u57ce\u5e02</div></div><div class="citylist listfirst"><h3>\u70ed\u95e8\u57ce\u5e02\uff1a</h3><ul>' + u(t) + '</ul></div><div class="citylist listlast"><h3>\u5176\u4ed6\u7701\u5e02\uff1a</h3><ul>' + v(k) + "</ul></div></div>");
                    a(b).layerAlertMask({
                        width: 660,
                        height: "auto",
                        title: "\u9009\u62e9\u5de5\u4f5c\u57ce\u5e02",
                        setContent: c
                    });
                    a("#citySelect").show();
                    w(a(f.inputVal).val(), a(f.hinput).val())
                }

                function w(b, c) { b.split(",");
                    var d = c.split(","),
                        e = a(".listfirst").find("li");
                    a.each(e, function(c, b) { a.each(d, function(c, e) { a(b).attr("data-id") !== e && a(b).attr("data-id").slice(0, 4) !== e || a(b).addClass("active") }) }) }

                function l(b) {
                    var c = a(".city-list").children(".city-selected");
                    a.each(c, function(c, e) { b === a(e).attr("data-id") && a(e).remove() }) }

                function p(b, c, d) {
                    if (a(".city-list").find("li").length <
                        f.numLimit) return d.addClass("active"), a(".city-list").append('<li data-id="' + b + '" class="city-selected">' + c + "<i></i></li>"), !0;
                    a("#error-in").text("\u6700\u591a\u9009\u62e9" + f.numLimit + "\u4e2a\u57ce\u5e02").show();
                    return !1
                }

                function x(b, c, d) {
                    var e = a(".city-list").children(".city-selected");
                    a.each(e, function(c, e) {-1 != a(e).attr("data-id").indexOf(b) && a(e).remove() });
                    if (a(".city-list").find("li").length < f.numLimit) return d.addClass("active"), d.siblings(".data-second").addClass("active"), d.parents(".inner-div").removeClass("in"),
                        a(".city-list").append('<li data-id="' + b + '" class="city-selected">' + c + "<i></i></li>"), !0;
                    a("#error-in").text("\u6700\u591a\u9009\u62e9" + f.numLimit + "\u4e2a\u57ce\u5e02").show();
                    return !1
                }

                function u(b) {
                    var c = "";
                    a.each(b[0].items, function(a, b) { c += '<li data-id="' + b.id + '">' + b.name + "</li>" });
                    return c }

                function v(b) {
                    var c = "",
                        d = function() {
                            var c = [];
                            a.each(a(f.hinput).val().split(","), function(a, b) { c.push(parseInt(b.slice(0, 4))) });
                            return c }();
                    a.each(b[0].items, function(b, g) {
                        c = 0 == (b + 1) % 8 || 30 == b ? -1 !== a.inArray(g.id,
                            d) ? c + ('<li data-index="' + b + '" data-id="' + g.id + '" class="flag other active">' + g.name + "</li>") : c + ('<li data-index="' + b + '" data-id="' + g.id + '" class="flag other">' + g.name + "</li>") : -1 !== a.inArray(g.id, d) ? c + ('<li data-index="' + b + '" data-id="' + g.id + '" class="other active">' + g.name + "</li>") : c + ('<li data-index="' + b + '" data-id="' + g.id + '" class="other">' + g.name + "</li>")
                    });
                    return c
                }

                function y(b) {
                    var c = "";
                    k[0].items[b].items ? (a.each(k[0].items[b].items, function(a, b) {
                        c += '<li class="data-second" data-id="' + b.id +
                            '">' + b.name + "</li>"
                    }), n = !1) : n = !0;
                    return c
                }

                function q(b) {
                    var c = a(".listfirst").find("li");
                    a.each(c, function(c, e) { a(e).attr("data-id") == b && (a(e).hasClass("active") ? a(e).removeClass("active") : a(e).addClass("active")) }) }

                function r(b) {
                    var c = a(".inner-div").find(".data-second");
                    a.each(c, function(c, e) { a(e).attr("data-id") == b && (a(e).hasClass("active") ? a(e).removeClass("active") : a(e).addClass("active")) }) }

                function h(b, c) {
                    var d = a(".city-list").find(".city-selected"),
                        e = [];
                    a.each(d, function(b, c) {
                        e.push(a(c).attr("data-id").slice(0,
                            4))
                    });
                    a.each(a(".listlast").find(".other"), function(d, f) { b === a(f).attr("data-id") && 1 == c ? a(f).addClass("active") : b === a(f).attr("data-id") && 0 == c && -1 == a.inArray(b, e) && a(f).removeClass("active") })
                }

                function z(b) { a.each(a(".listfirst").find("li"), function(c, d) {-1 != a(d).attr("data-id").indexOf(b) && a(d).hasClass("active") && a(d).removeClass("active") }) }

                function A(b) { a.each(a(".listfirst").find("li"), function(c, d) {-1 != a(d).attr("data-id").indexOf(b) && (a(d).hasClass("active") || a(d).addClass("active")) }) }

                function B() {
                    a("#citySelect").on("click",
                        ".city-clear",
                        function() { a(".city-list").empty();
                            a("#citySelect").find("li").removeClass("active") }).on("click", ".city-submit", function() {
                        var b = [],
                            c = [];
                        a.each(a(".city-list").find(".city-selected"), function(d, e) { b.push(a(e).text());
                            c.push(a(e).attr("data-id")) });
                        a(f.inputVal).val(b.join(","));
                        a(f.hinput).val(c.join(",")); "function" === typeof f.callback ? f.callback() : "";
                        a(".layer-alert-header i").trigger("click") }).on("click", ".listfirst li", function() {
                        var b = a(this).attr("data-id"),
                            c = a(this).text(),
                            d = a(this);
                        if (a(this).hasClass("active")) {
                            if (c = function() {
                                    var b = [];
                                    a.each(a(".city-list").find(".city-selected"), function(c, d) { b.push(a(d).attr("data-id")) });
                                    return b }(), -1 === a.inArray(b.slice(0, 4), c) || 4 === b.length) a(this).removeClass("active"), a("#error-in").hide(), l(b), r(b), h(b.slice(0, 4), 0) } else p(b, c, d) && (r(b), h(b.slice(0, 4), 1))
                    }).on("click", ".listlast .other", function() {
                        a(".listlast li").css({ border: "0 none", "border-bottom": "0 none", "margin-bottom": "0", "z-index": "0" });
                        a(".listlast .inner-div").remove();
                        var b = a(this);
                        index = a(this).attr("data-index");
                        val = a(this).attr("data-id");
                        selectedItems = function() {
                            var b = [];
                            a.each(a(".city-list").find(".city-selected"), function(c, d) { b.push(a(d).attr("data-id").slice(0, 4)) });
                            return b }();
                        temp = a('<li class="inner-div in"><ul><li data-id=' + k[0].items[index].id + ' class="city-boss">' + k[0].items[index].name + "</li>" + y(index) + "</ul></li>");
                        if (n) {
                            var c = a(this).attr("data-id"),
                                d = a(this).text();
                            a(this).hasClass("active") ? (a(this).removeClass("active"), a("#error-in").hide(),
                                l(c)) : p(c, d, b)
                        } else a(this).hasClass("flag") ? a(this).after(temp) : a(this).nextAll(".flag:first").after(temp), -1 == a.inArray(val, selectedItems) ? !0 : C(val, b), a(this).css({ border: "1px solid #5db664", "border-bottom": "1px solid #fff", "margin-bottom": "-1px", "z-index": "1" })
                    }).on("click", ".inner-div.in .data-second", function(b) {
                        var c = a(this).attr("data-id"),
                            d = a(this),
                            e = a(this).text();
                        d.hasClass("active") ? (a(this).removeClass("active"), a("#error-in").hide(), l(c), q(c), h(c.slice(0, 4), 0)) : p(c, e, d) && (q(c), h(c.slice(0,
                            4), 1));
                        b = b || window.event;
                        b.stopPropagation ? b.stopPropagation() : b.cancelBubble = !0
                    }).on("click", ".city-boss", function(b) {
                        var c = a(this).attr("data-id"),
                            d = a(this).text(),
                            e = a(this);
                        a(this).hasClass("active") ? (a(this).removeClass("active"), a(this).siblings(".data-second").removeClass("active"), a("#error-in").hide(), a(this).parents(".inner-div").addClass("in"), l(c, d), z(c), h(c.slice(0, 4), 0)) : x(c, d, e) && (A(c), h(c.slice(0, 4), 1));
                        b = b || window.event;
                        b.stopPropagation ? b.stopPropagation() : b.cancelBubble = !0 }).on("click",
                        ".city-selected i",
                        function() {
                            var b = a(this).parent().attr("data-id"),
                                c = a(".listfirst").find(".active");
                            a(this).parent(".city-selected").remove();
                            a("#error-in").hide();
                            if (4 == b.length) a(".inner-div").length && a(".city-boss").attr("data-id") == b ? a(".city-boss").trigger("click") : (a.each(a(".listlast").find(".other"), function(c, d) { b == a(d).attr("data-id") && a(d).removeClass("active") }), a.each(c, function(c, d) { a(d).attr("data-id").slice(0, 4) == b && a(d).removeClass("active") }));
                            else if (a(".inner-div").length &&
                                a(".city-boss").attr("data-id") == b.slice(0, 4)) a.each(a(".inner-div").find(".data-second"), function(c, d) { a(d).attr("data-id") == b && a(d).trigger("click") });
                            else {
                                var d = b.slice(0, 4),
                                    c = function() {
                                        var b = [];
                                        a.each(a(".city-list").find(".city-selected"), function(c, d) { b.push(a(d).attr("data-id").slice(0, 4)) });
                                        return b }();
                                hotcitys = a(".listfirst").find("li"); - 1 == a.inArray(d, c) && a.each(a(".listlast").find(".other"), function(b, c) { d == a(c).attr("data-id") && a(c).removeClass("active") });
                                a.each(hotcitys, function(c,
                                    d) { a(d).hasClass("active") && b == a(d).attr("data-id") && a(d).removeClass("active") })
                            }
                        })
                }

                function C(b, c) {
                    var d = function() {
                        var b = [];
                        a.each(a(".city-list").find(".city-selected"), function(c, d) { b.push(a(d).attr("data-id")) });
                        return b }();
                    a.each(d, function(d, f) {
                        f === b ? (a(".city-boss").addClass("active"), a(".inner-div").removeClass("in"), a(".city-boss").siblings(".data-second").addClass("active"), c.addClass("active")) : a.each(a(".data-second"), function(b, d) {
                            f === a(d).attr("data-id") && (a(d).addClass("active"),
                                c.hasClass("active") || c.addClass("active"))
                        })
                    })
                }
                a("#citySelect")[0] ? a("#citySelect").show() : (m(f.trigger), B())
            })
        }
    })
})(jQuery);

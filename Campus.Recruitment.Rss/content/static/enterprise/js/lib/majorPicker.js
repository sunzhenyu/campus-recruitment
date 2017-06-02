(function (a) {
    a.majorPicker = function (m, r) {
        function t() { var c = ""; a.each(h, function (a, e) { c += '<li data-id="' + e.id + '">' + e.name + "</li>" }); return c } var u = { title: "\u8bf7\u9009\u62e9\u4e13\u4e1a\u7c7b\u522b", content: "", onMajorPicker: function () { } }, c = this, h = [{
            id: "12", name: "\u7ba1\u7406\u5b66", items: [{
                id: "1201", name: "\u7ba1\u7406\u79d1\u5b66\u4e0e\u5de5\u7a0b", items: [{ id: "120101", name: "\u7ba1\u7406\u79d1\u5b66\u793e\u4f1a\u4e3b\u4e49" }, { id: "120102", name: "\u4fe1\u606f\u7ba1\u7406\u4e0e\u4fe1\u606f\u7cfb\u7edf" },
                { id: "120103", name: "\u5de5\u7a0b\u7ba1\u7406" }, { id: "120104", name: "\u623f\u5730\u4ea7\u5f00\u53d1\u4e0e\u7ba1\u7406" }, { id: "120105", name: "\u5de5\u7a0b\u9020\u4ef7" }, { id: "120106TK", name: "\u4fdd\u5bc6\u7ba1\u7406" }]
            }, {
                id: "1202", name: "\u5de5\u5546\u7ba1\u7406", items: [{ id: "120201K", name: "\u5de5\u5546\u7ba1\u7406" }, { id: "120202", name: "\u5e02\u573a\u8425\u9500" }, { id: "120203K", name: "\u4f1a\u8ba1\u5b66" }, { id: "120204", name: "\u8d22\u52a1\u7ba1\u7406" }, { id: "120205", name: "\u56fd\u9645\u5546\u52a1" }, {
                    id: "120206",
                    name: "\u4eba\u529b\u8d44\u6e90\u7ba1\u7406"
                }, { id: "120207", name: "\u5ba1\u8ba1\u5b66" }, { id: "120208", name: "\u8d44\u4ea7\u8bc4\u4f30" }, { id: "120209", name: "\u7269\u4e1a\u7ba1\u7406" }, { id: "120210", name: "\u6587\u5316\u4ea7\u4e1a\u7ba1\u7406" }, { id: "120211T", name: "\u52b3\u52a8\u5173\u7cfb" }, { id: "120212T", name: "\u4f53\u80b2\u7ecf\u6d4e\u4e0e\u7ba1\u7406" }, { id: "120213T", name: "\u8d22\u52a1\u4f1a\u8ba1\u6559\u80b2" }, { id: "120214T", name: "\u5e02\u573a\u8425\u9500\u6559\u80b2" }]
            }, {
                id: "1203", name: "\u519c\u4e1a\u7ecf\u6d4e\u7ba1\u7406",
                items: [{ id: "120301", name: "\u519c\u6797\u7ecf\u6d4e\u7ba1\u7406" }, { id: "120302", name: "\u519c\u6751\u533a\u57df\u53d1\u5c55" }]
            }, {
                id: "1204", name: "\u516c\u5171\u7ba1\u7406", items: [{ id: "120401", name: "\u516c\u5171\u4e8b\u4e1a\u7ba1\u7406" }, { id: "120402", name: "\u884c\u653f\u7ba1\u7406" }, { id: "120403", name: "\u52b3\u52a8\u4e0e\u793e\u4f1a\u4fdd\u969c" }, { id: "120404", name: "\u571f\u5730\u8d44\u6e90\u7ba1\u7406" }, { id: "120405", name: "\u57ce\u5e02\u7ba1\u7406" }, { id: "120406TK", name: "\u6d77\u5173\u7ba1\u7406" }, {
                    id: "120407T",
                    name: "\u4ea4\u901a\u7ba1\u7406"
                }, { id: "120408T", name: "\u6d77\u4e8b\u7ba1\u7406" }, { id: "120409T", name: "\u516c\u5171\u5173\u7cfb\u5b66" }]
            }, { id: "1205", name: "\u56fe\u4e66\u60c5\u62a5\u4e0e\u6863\u6848\u7ba1\u7406", items: [{ id: "120501", name: "\u56fe\u4e66\u9986\u5b66" }, { id: "120502", name: "\u6863\u6848\u5b66" }, { id: "120503", name: "\u4fe1\u606f\u8d44\u6e90\u7ba1\u7406" }] }, {
                id: "1206", name: "\u7269\u6d41\u7ba1\u7406\u4e0e\u5de5\u7a0b", items: [{ id: "120601", name: "\u7269\u6d41\u7ba1\u7406" }, { id: "120602", name: "\u7269\u6d41\u5de5\u7a0b" },
                { id: "120603T", name: "\u91c7\u8d2d\u7ba1\u7406" }]
            }, { id: "1207", name: "\u5de5\u4e1a\u5de5\u7a0b", items: [{ id: "120701", name: "\u5de5\u4e1a\u5de5\u7a0b" }, { id: "120702T", name: "\u6807\u51c6\u5316\u5de5\u7a0b" }, { id: "120703T", name: "\u8d28\u91cf\u7ba1\u7406\u5de5\u7a0b" }] }, { id: "1208", name: "\u7535\u5b50\u5546\u52a1", items: [{ id: "120801", name: "\u7535\u5b50\u5546\u52a1" }, { id: "120802T", name: "\u7535\u5b50\u5546\u52a1\u53ca\u6cd5\u5f8b" }] }, {
                id: "1209", name: "\u65c5\u6e38\u7ba1\u7406", items: [{ id: "120901K", name: "\u65c5\u6e38\u7ba1\u7406" },
                { id: "120902", name: "\u9152\u5e97\u7ba1\u7406" }, { id: "120903", name: "\u4f1a\u5c55\u7ecf\u6d4e\u4e0e\u7ba1\u7406" }, { id: "120904T", name: "\u65c5\u6e38\u7ba1\u7406\u4e0e\u670d\u52a1\u6559\u80b2" }]
            }]
        }, {
            id: "08", name: "\u5de5\u5b66", items: [{ id: "0801", name: "\u529b\u5b66", items: [{ id: "080101", name: "\u7406\u8bba\u4e0e\u5e94\u7528\u529b\u5b66" }, { id: "080102", name: "\u5de5\u7a0b\u529b\u5b66" }] }, {
                id: "0802", name: "\u673a\u68b0", items: [{ id: "080201", name: "\u673a\u68b0\u5de5\u7a0b" }, { id: "080202", name: "\u673a\u68b0\u8bbe\u8ba1\u5236\u9020\u53ca\u5176\u81ea\u52a8\u5316" },
                { id: "080203", name: "\u6750\u6599\u6210\u578b\u53ca\u63a7\u5236\u5de5\u7a0b" }, { id: "080204", name: "\u673a\u68b0\u7535\u5b50\u5de5\u7a0b" }, { id: "080205", name: "\u5de5\u4e1a\u8bbe\u8ba1" }, { id: "080206", name: "\u8fc7\u7a0b\u88c5\u5907\u4e0e\u63a7\u5236\u5de5\u7a0b" }, { id: "080207", name: "\u8f66\u8f86\u5de5\u7a0b" }, { id: "080208", name: "\u6c7d\u8f66\u670d\u52a1\u5de5\u7a0b" }, { id: "080209T", name: "\u673a\u68b0\u5de5\u827a\u6280\u672f" }, { id: "080210T", name: "\u5fae\u673a\u7535\u7cfb\u7edf\u5de5\u7a0b" }, { id: "080211T", name: "\u673a\u7535\u6280\u672f\u6559\u80b2" },
                { id: "080212T", name: "\u6c7d\u8f66\u7ef4\u4fee\u5de5\u7a0b\u6559\u80b2" }]
            }, { id: "0803", name: "\u4eea\u5668", items: [{ id: "080301", name: "\u6d4b\u63a7\u6280\u672f\u4e0e\u4eea\u5668" }] }, {
                id: "0804", name: "\u6750\u6599", items: [{ id: "080401", name: "\u6750\u6599\u79d1\u5b66\u4e0e\u5de5\u7a0b" }, { id: "080402", name: "\u6750\u6599\u7269\u7406" }, { id: "080403", name: "\u6750\u6599\u5316\u5b66" }, { id: "080404", name: "\u51b6\u91d1\u5de5\u7a0b" }, { id: "080405", name: "\u91d1\u5c5e\u6750\u6599\u5de5\u7a0b" }, { id: "080406", name: "\u65e0\u673a\u975e\u91d1\u5c5e\u6750\u6599\u5de5\u7a0b" },
                { id: "080407", name: "\u9ad8\u5206\u5b50\u6750\u6599\u4e0e\u5de5\u7a0b" }, { id: "080408", name: "\u590d\u5408\u6750\u6599\u4e0e\u5de5\u7a0b" }, { id: "080409T", name: "\u7c89\u4f53\u6750\u6599\u79d1\u5b66\u4e0e\u5de5\u7a0b" }, { id: "080410T", name: "\u5b9d\u77f3\u53ca\u6750\u6599\u5de5\u827a\u5b66" }, { id: "080411T", name: "\u710a\u63a5\u6280\u672f\u4e0e\u5de5\u7a0b" }, { id: "080412T", name: "\u529f\u80fd\u6750\u6599" }, { id: "080413T", name: "\u7eb3\u7c73\u6750\u6599\u4e0e\u6280\u672f" }, { id: "080414T", name: "\u65b0\u80fd\u6e90\u6750\u6599\u4e0e\u5668\u4ef6" }]
            },
            { id: "0805", name: "\u80fd\u6e90\u52a8\u529b", items: [{ id: "080501", name: "\u80fd\u6e90\u4e0e\u52a8\u529b\u5de5\u7a0b" }, { id: "080502T", name: "\u80fd\u6e90\u4e0e\u73af\u5883\u7cfb\u7edf\u5de5\u7a0b" }, { id: "080503T", name: "\u65b0\u80fd\u6e90\u79d1\u5b66\u4e0e\u5de5\u7a0b" }] }, {
                id: "0806", name: "\u7535\u6c14", items: [{ id: "080601", name: "\u7535\u6c14\u5de5\u7a0b\u53ca\u5176\u81ea\u52a8\u5316" }, { id: "080602T", name: "\u667a\u80fd\u7535\u7f51\u4fe1\u606f\u5de5\u7a0b" }, { id: "080603T", name: "\u5149\u6e90\u4e0e\u7167\u660e" },
                { id: "080604T", name: "\u7535\u6c14\u5de5\u7a0b\u4e0e\u667a\u80fd\u63a7\u5236" }]
            }, {
                id: "0807", name: "\u7535\u5b50\u4fe1\u606f", items: [{ id: "080701", name: "\u7535\u5b50\u4fe1\u606f\u5de5\u7a0b" }, { id: "080702", name: "\u7535\u5b50\u79d1\u5b66\u4e0e\u6280\u672f" }, { id: "080703", name: "\u901a\u4fe1\u5de5\u7a0b" }, { id: "080704", name: "\u5fae\u7535\u5b50\u79d1\u5b66\u4e0e\u5de5\u7a0b" }, { id: "080705", name: "\u5149\u7535\u4fe1\u606f\u79d1\u5b66\u4e0e\u5de5\u7a0b" }, { id: "080706", name: "\u4fe1\u606f\u5de5\u7a0b" }, {
                    id: "080707T",
                    name: "\u5e7f\u64ad\u7535\u89c6\u5de5\u7a0b"
                }, { id: "080708T", name: "\u6c34\u58f0\u5de5\u7a0b" }, { id: "080709T", name: "\u7535\u5b50\u5c01\u88c5\u6280\u672f" }, { id: "080710T", name: "\u96c6\u6210\u7535\u8def\u8bbe\u8ba1\u4e0e\u96c6\u6210\u7cfb\u7edf" }, { id: "080711T", name: "\u533b\u5b66\u4fe1\u606f\u5de5\u7a0b" }, { id: "080712T", name: "\u7535\u78c1\u573a\u4e0e\u65e0\u7ebf\u6280\u672f" }, { id: "080713T", name: "\u7535\u6ce2\u4f20\u64ad\u4e0e\u5929\u7ebf" }, { id: "080714T", name: "\u7535\u5b50\u4fe1\u606f\u79d1\u5b66\u4e0e\u6280\u672f" },
                { id: "080715T", name: "\u7535\u4fe1\u5de5\u7a0b\u53ca\u7ba1\u7406" }, { id: "080716T", name: "\u5e94\u7528\u7535\u5b50\u6280\u672f\u6559\u80b2" }]
            }, { id: "0808", name: "\u81ea\u52a8\u5316", items: [{ id: "080801", name: "\u81ea\u52a8\u5316" }, { id: "080802T", name: "\u8f68\u9053\u4ea4\u901a\u4fe1\u53f7\u4e0e\u63a7\u5236" }] }, {
                id: "0809", name: "\u8ba1\u7b97\u673a", items: [{ id: "080901", name: "\u8ba1\u7b97\u673a\u79d1\u5b66\u4e0e\u6280\u672f" }, { id: "080902", name: "\u8f6f\u4ef6\u5de5\u7a0b" }, { id: "080903", name: "\u7f51\u7edc\u5de5\u7a0b" },
                { id: "080904K", name: "\u4fe1\u606f\u5b89\u5168" }, { id: "080905", name: "\u7269\u8054\u7f51\u5de5\u7a0b" }, { id: "080906", name: "\u6570\u5b57\u5a92\u4f53\u6280\u672f" }, { id: "080907T", name: "\u667a\u80fd\u79d1\u5b66\u4e0e\u6280\u672f" }, { id: "080908T", name: "\u7a7a\u95f4\u4fe1\u606f\u4e0e\u6570\u5b57\u6280\u672f" }, { id: "080909T", name: "\u7535\u5b50\u4e0e\u8ba1\u7b97\u673a\u5de5\u7a0b" }]
            }, {
                id: "0810", name: "\u571f\u6728", items: [{ id: "081001", name: "\u571f\u6728\u5de5\u7a0b" }, { id: "081002", name: "\u5efa\u7b51\u73af\u5883\u4e0e\u80fd\u6e90\u5e94\u7528\u5de5\u7a0b" },
                { id: "081003", name: "\u7ed9\u6392\u6c34\u79d1\u5b66\u4e0e\u5de5\u7a0b" }, { id: "081004", name: "\u5efa\u7b51\u7535\u6c14\u4e0e\u667a\u80fd\u5316" }, { id: "081005T", name: "\u57ce\u5e02\u5730\u4e0b\u7a7a\u95f4\u5de5\u7a0b" }, { id: "081006T", name: "\u9053\u8def\u6865\u6881\u4e0e\u6e21\u6cb3\u5de5\u7a0b" }]
            }, {
                id: "0811", name: "\u6c34\u5229", items: [{ id: "081101", name: "\u6c34\u5229\u6c34\u7535\u5de5\u7a0b" }, { id: "081102", name: "\u6c34\u6587\u4e0e\u6c34\u8d44\u6e90\u5de5\u7a0b" }, { id: "081103", name: "\u6e2f\u53e3\u822a\u9053\u4e0e\u6d77\u5cb8\u5de5\u7a0b" },
                { id: "081104T", name: "\u6c34\u52a1\u5de5\u7a0b" }]
            }, { id: "0812", name: "\u6d4b\u7ed8", items: [{ id: "081201", name: "\u6d4b\u7ed8\u5de5\u7a0b" }, { id: "081202", name: "\u9065\u611f\u79d1\u5b66\u4e0e\u6280\u672f" }, { id: "081203T", name: "\u5bfc\u822a\u5de5\u7a0b" }, { id: "081204T", name: "\u5730\u7406\u56fd\u60c5\u76d1\u6d4b" }] }, {
                id: "0813", name: "\u5316\u5de5\u4e0e\u5236\u836f", items: [{ id: "081301", name: "\u5316\u5b66\u5de5\u7a0b\u4e0e\u5de5\u827a" }, { id: "081302", name: "\u5236\u836f\u5de5\u7a0b" }, { id: "081303T", name: "\u8d44\u6e90\u5faa\u73af\u79d1\u5b66\u4e0e\u5de5\u7a0b" },
                { id: "081304T", name: "\u80fd\u6e90\u5316\u5b66\u5de5\u7a0b" }, { id: "081305T", name: "\u5316\u5b66\u5de5\u7a0b\u4e0e\u5de5\u4e1a\u751f\u7269\u5de5\u7a0b" }]
            }, { id: "0814", name: "\u5730\u8d28", items: [{ id: "081401", name: "\u5730\u8d28\u5de5\u7a0b" }, { id: "081402", name: "\u52d8\u67e5\u6280\u672f\u4e0e\u5de5\u7a0b" }, { id: "081403", name: "\u8d44\u6e90\u52d8\u67e5\u5de5\u7a0b" }, { id: "081404T", name: "\u5730\u4e0b\u6c34\u79d1\u5b66\u4e0e\u5de5\u7a0b" }] }, {
                id: "0815", name: "\u77ff\u4e1a", items: [{ id: "081501", name: "\u91c7\u77ff\u5de5\u7a0b" },
                { id: "081502", name: "\u77f3\u6cb9\u5de5\u7a0b" }, { id: "081503", name: "\u77ff\u7269\u52a0\u5de5\u5de5\u7a0b" }, { id: "081504", name: "\u6cb9\u6c14\u50a8\u8fd0\u5de5\u7a0b" }, { id: "081505T", name: "\u77ff\u7269\u8d44\u6e90\u5de5\u7a0b" }, { id: "081506T", name: "\u6d77\u6d0b\u6cb9\u6c14\u5de5\u7a0b" }]
            }, {
                id: "0816", name: "\u7eba\u7ec7", items: [{ id: "081601", name: "\u7eba\u7ec7\u5de5\u7a0b" }, { id: "081602", name: "\u670d\u88c5\u8bbe\u8ba1\u4e0e\u5de5\u7a0b" }, { id: "081603T", name: "\u975e\u7ec7\u9020\u6750\u6599\u4e0e\u5de5\u7a0b" },
                { id: "081604T", name: "\u670d\u88c5\u8bbe\u8ba1\u4e0e\u5de5\u827a\u6559\u80b2" }]
            }, { id: "0817", name: "\u8f7b\u5de5", items: [{ id: "081701", name: "\u8f7b\u5316\u5de5\u7a0b" }, { id: "081702", name: "\u5305\u88c5\u5de5\u7a0b" }, { id: "081703", name: "\u5370\u5237\u5de5\u7a0b" }] }, {
                id: "0818", name: "\u4ea4\u901a\u8fd0\u8f93", items: [{ id: "081801", name: "\u4ea4\u901a\u8fd0\u8f93" }, { id: "081802", name: "\u4ea4\u901a\u5de5\u7a0b" }, { id: "081803K", name: "\u822a\u6d77\u6280\u672f" }, { id: "081804K", name: "\u8f6e\u673a\u5de5\u7a0b" }, {
                    id: "081805K",
                    name: "\u98de\u884c\u6280\u672f"
                }, { id: "081806T", name: "\u4ea4\u901a\u8bbe\u5907\u4e0e\u63a7\u5236\u5de5\u7a0b" }, { id: "081807T", name: "\u6551\u52a9\u4e0e\u6253\u635e\u5de5\u7a0b" }, { id: "081808TK", name: "\u8239\u8236\u7535\u5b50\u7535\u6c14\u5de5\u7a0b" }]
            }, { id: "0819", name: "\u6d77\u6d0b\u5de5\u7a0b", items: [{ id: "081901", name: "\u8239\u8236\u4e0e\u6d77\u6d0b\u5de5\u7a0b" }, { id: "081902T", name: "\u6d77\u6d0b\u5de5\u7a0b\u4e0e\u6280\u672f" }, { id: "081903T", name: "\u6d77\u6d0b\u8d44\u6e90\u5f00\u53d1\u6280\u672f" }] },
            { id: "0820", name: "\u822a\u7a7a\u822a\u5929", items: [{ id: "082001", name: "\u822a\u7a7a\u822a\u5929\u5de5\u7a0b" }, { id: "082002", name: "\u98de\u884c\u5668\u8bbe\u8ba1\u4e0e\u5de5\u7a0b" }, { id: "082003", name: "\u98de\u884c\u5668\u5236\u9020\u5de5\u7a0b" }, { id: "082004", name: "\u98de\u884c\u5668\u52a8\u529b\u5de5\u7a0b" }, { id: "082005", name: "\u98de\u884c\u5668\u73af\u5883\u4e0e\u751f\u547d\u4fdd\u969c\u5de5\u7a0b" }, { id: "082006T", name: "\u98de\u884c\u5668\u8d28\u91cf\u4e0e\u53ef\u9760\u6027" }, { id: "082007T", name: "\u98de\u884c\u5668\u9002\u822a\u6280\u672f" }] },
            { id: "0821", name: "\u5175\u5668", items: [{ id: "082101", name: "\u6b66\u5668\u7cfb\u7edf\u4e0e\u5de5\u7a0b" }, { id: "082102", name: "\u6b66\u5668\u53d1\u5c04\u5de5\u7a0b" }, { id: "082103", name: "\u63a2\u6d4b\u5236\u5bfc\u4e0e\u63a7\u5236\u6280\u672f" }, { id: "082104", name: "\u5f39\u836f\u5de5\u7a0b\u4e0e\u7206\u70b8\u6280\u672f" }, { id: "082105", name: "\u7279\u79cd\u80fd\u6e90\u6280\u672f\u4e0e\u5de5\u7a0b" }, { id: "082106", name: "\u88c5\u7532\u8f66\u8f86\u5de5\u7a0b" }, { id: "082107", name: "\u4fe1\u606f\u5bf9\u6297\u6280\u672f" }] },
            { id: "0822", name: "\u6838\u5de5\u7a0b", items: [{ id: "082201", name: "\u6838\u5de5\u7a0b\u4e0e\u6838\u6280\u672f" }, { id: "082202", name: "\u8f90\u5c04\u9632\u62a4\u4e0e\u6838\u5b89\u5168" }, { id: "082203", name: "\u5de5\u7a0b\u7269\u7406" }, { id: "082204", name: "\u6838\u5316\u5de5\u4e0e\u6838\u71c3\u6599\u5de5\u7a0b" }] }, {
                id: "0823", name: "\u519c\u4e1a\u5de5\u7a0b", items: [{ id: "082301", name: "\u519c\u4e1a\u5de5\u7a0b" }, { id: "082302", name: "\u519c\u4e1a\u673a\u68b0\u5316\u53ca\u5176\u81ea\u52a8\u5316" }, { id: "082303", name: "\u519c\u4e1a\u7535\u6c14\u5316" },
                { id: "082304", name: "\u519c\u4e1a\u5efa\u7b51\u73af\u5883\u4e0e\u80fd\u6e90\u5de5\u7a0b" }, { id: "082305", name: "\u519c\u4e1a\u6c34\u5229\u5de5\u7a0b" }]
            }, { id: "0824", name: "\u6797\u4e1a\u5de5\u7a0b", items: [{ id: "082401", name: "\u68ee\u6797\u5de5\u7a0b" }, { id: "082402", name: "\u6728\u6750\u79d1\u5b66\u4e0e\u5de5\u7a0b" }, { id: "082403", name: "\u6797\u4ea7\u5316\u5de5" }] }, {
                id: "0825", name: "\u73af\u5883\u79d1\u5b66\u4e0e\u5de5\u7a0b", items: [{ id: "082501", name: "\u73af\u5883\u79d1\u5b66\u4e0e\u5de5\u7a0b" }, {
                    id: "082502",
                    name: "\u73af\u5883\u5de5\u7a0b"
                }, { id: "082503", name: "\u73af\u5883\u79d1\u5b66" }, { id: "082504", name: "\u73af\u5883\u751f\u6001\u5de5\u7a0b" }, { id: "082505T", name: "\u73af\u4fdd\u8bbe\u5907\u5de5\u7a0b" }, { id: "082506T", name: "\u8d44\u6e90\u73af\u5883\u79d1\u5b66" }, { id: "082507T", name: "\u6c34\u8d28\u79d1\u5b66\u4e0e\u6280\u672f" }]
            }, { id: "0826", name: "\u751f\u7269\u533b\u5b66\u5de5\u7a0b", items: [{ id: "082601", name: "\u751f\u7269\u533b\u5b66\u5de5\u7a0b" }, { id: "082602T", name: "\u5047\u80a2\u77eb\u5f62\u5de5\u7a0b" }] },
            { id: "0827", name: "\u98df\u54c1\u79d1\u5b66\u4e0e\u5de5\u7a0b", items: [{ id: "082701", name: "\u98df\u54c1\u79d1\u5b66\u4e0e\u5de5\u7a0b" }, { id: "082702", name: "\u98df\u54c1\u8d28\u91cf\u4e0e\u5b89\u5168" }, { id: "082703", name: "\u7cae\u98df\u5de5\u7a0b" }, { id: "082704", name: "\u4e73\u54c1\u5de5\u7a0b" }, { id: "082705", name: "\u917f\u9152\u5de5\u7a0b" }, { id: "082706T", name: "\u8461\u8404\u4e0e\u8461\u8404\u9152\u5de5\u7a0b" }, { id: "082707T", name: "\u98df\u54c1\u8425\u517b\u4e0e\u68c0\u9a8c\u6559\u80b2" }, { id: "082708T", name: "\u70f9\u996a\u4e0e\u8425\u517b\u6559\u80b2" }] },
            { id: "0828", name: "\u5efa\u7b51", items: [{ id: "082801", name: "\u5efa\u7b51\u5b66" }, { id: "082802", name: "\u57ce\u4e61\u89c4\u5212" }, { id: "082803", name: "\u98ce\u666f\u56ed\u6797" }, { id: "082804T", name: "\u5386\u53f2\u5efa\u7b51\u4fdd\u62a4\u5de5\u7a0b" }] }, { id: "0829", name: "\u5b89\u5168\u79d1\u5b66\u4e0e\u5de5\u7a0b", items: [{ id: "082901", name: "\u5b89\u5168\u5de5\u7a0b" }] }, { id: "0830", name: "\u751f\u7269\u5de5\u7a0b", items: [{ id: "083001", name: "\u751f\u7269\u5de5\u7a0b" }, { id: "083002T", name: "\u751f\u7269\u5236\u836f" }] },
            {
                id: "0831", name: "\u516c\u5b89\u6280\u672f", items: [{ id: "083101K", name: "\u5211\u4e8b\u79d1\u5b66\u6280\u672f" }, { id: "083102K", name: "\u6d88\u9632\u5de5\u7a0b" }, { id: "083103TK", name: "\u4ea4\u901a\u7ba1\u7406\u5de5\u7a0b" }, { id: "083104TK", name: "\u5b89\u5168\u9632\u8303\u5de5\u7a0b" }, { id: "083105TK", name: "\u516c\u5b89\u89c6\u542c\u6280\u672f" }, { id: "083106TK", name: "\u62a2\u9669\u6551\u63f4\u6307\u6325\u4e0e\u6280\u672f" }, { id: "083107TK", name: "\u706b\u707e\u52d8\u67e5" }, { id: "083108TK", name: "\u7f51\u7edc\u5b89\u5168\u4e0e\u6267\u6cd5" },
                { id: "083109TK", name: "\u6838\u751f\u5316\u6d88\u9632" }]
            }]
        }, {
            id: "02", name: "\u7ecf\u6d4e\u5b66", items: [{ id: "0201", name: "\u7ecf\u6d4e\u5b66", items: [{ id: "020101", name: "\u7ecf\u6d4e\u5b66" }, { id: "020102", name: "\u7ecf\u6d4e\u7edf\u8ba1\u5b66" }, { id: "020103T", name: "\u56fd\u6c11\u7ecf\u6d4e\u7ba1\u7406" }, { id: "020104T", name: "\u8d44\u6e90\u4e0e\u73af\u5883\u7ecf\u6d4e\u5b66" }, { id: "020105T", name: "\u5546\u52a1\u7ecf\u6d4e\u5b66" }, { id: "020106T", name: "\u80fd\u6e90\u7ecf\u6d4e" }] }, {
                id: "0202", name: "\u8d22\u653f\u5b66",
                items: [{ id: "020201K", name: "\u8d22\u653f\u5b66" }, { id: "020202", name: "\u7a0e\u6536\u5b66" }]
            }, { id: "0203", name: "\u91d1\u878d\u5b66", items: [{ id: "020301K", name: "\u91d1\u878d\u5b66" }, { id: "020302", name: "\u91d1\u878d\u5de5\u7a0b" }, { id: "020303", name: "\u4fdd\u9669\u5b66" }, { id: "020304", name: "\u6295\u8d44\u5b66" }, { id: "020305T", name: "\u91d1\u878d\u6570\u5b66" }, { id: "020306T", name: "\u4fe1\u7528\u7ba1\u7406" }, { id: "020307T", name: "\u7ecf\u6d4e\u4e0e\u91d1\u878d" }] }, {
                id: "0204", name: "\u7ecf\u6d4e\u4e0e\u8d38\u6613", items: [{
                    id: "020401",
                    name: "\u56fd\u9645\u7ecf\u6d4e\u4e0e\u8d38\u6613"
                }, { id: "020402", name: "\u8d38\u6613\u7ecf\u6d4e" }]
            }]
        }, {
            id: "05", name: "\u6587\u5b66", items: [{
                id: "0501", name: "\u4e2d\u56fd\u8bed\u8a00\u6587\u5b66", items: [{ id: "050101", name: "\u6c49\u8bed\u8a00\u6587\u5b66" }, { id: "050102", name: "\u6c49\u8bed\u8a00" }, { id: "050103", name: "\u6c49\u8bed\u56fd\u9645\u6559\u80b2" }, { id: "050104", name: "\u4e2d\u56fd\u5c11\u6570\u6c11\u65cf\u8bed\u8a00\u6587\u5b66" }, { id: "050105", name: "\u53e4\u5178\u6587\u732e\u5b66" }, { id: "050106T", name: "\u5e94\u7528\u8bed\u8a00\u5b66" },
                { id: "050107T", name: "\u79d8\u4e66\u5b66" }]
            }, {
                id: "0502", name: "\u5916\u56fd\u8bed\u8a00\u6587\u5b66", items: [{ id: "050201", name: "\u82f1\u8bed" }, { id: "050202", name: "\u4fc4\u8bed" }, { id: "050203", name: "\u5fb7\u8bed" }, { id: "050204", name: "\u6cd5\u8bed" }, { id: "050205", name: "\u897f\u73ed\u7259\u8bed" }, { id: "050206", name: "\u963f\u62c9\u4f2f\u8bed" }, { id: "050207", name: "\u65e5\u8bed" }, { id: "050208", name: "\u6ce2\u65af\u8bed" }, { id: "050209", name: "\u671d\u9c9c\u8bed" }, { id: "050210", name: "\u83f2\u5f8b\u5bbe\u8bed" }, {
                    id: "050211",
                    name: "\u68b5\u8bed\u5df4\u5229\u8bed"
                }, { id: "050212", name: "\u5370\u5ea6\u5c3c\u897f\u4e9a\u8bed" }, { id: "050213", name: "\u5370\u5730\u8bed" }, { id: "050214", name: "\u67ec\u57d4\u5be8\u8bed" }, { id: "050215", name: "\u8001\u631d\u8bed" }, { id: "050216", name: "\u7f05\u7538\u8bed" }, { id: "050217", name: "\u9a6c\u6765\u8bed" }, { id: "050218", name: "\u8499\u53e4\u8bed" }, { id: "050219", name: "\u50e7\u4f3d\u7f57\u8bed" }, { id: "050220", name: "\u6cf0\u8bed" }, { id: "050221", name: "\u4e4c\u5c14\u90fd\u8bed" }, { id: "050222", name: "\u5e0c\u4f2f\u6765\u8bed" },
                { id: "050223", name: "\u8d8a\u5357\u8bed" }, { id: "050224", name: "\u8c6a\u8428\u8bed" }, { id: "050225", name: "\u65af\u74e6\u5e0c\u91cc\u8bed" }, { id: "050226", name: "\u963f\u5c14\u5df4\u5c3c\u4e9a\u8bed" }, { id: "050227", name: "\u4fdd\u52a0\u5229\u4e9a\u8bed" }, { id: "050228", name: "\u6ce2\u5170\u8bed" }, { id: "050229", name: "\u6377\u514b\u8bed" }, { id: "050230", name: "\u65af\u6d1b\u4f10\u514b\u8bed" }, { id: "050231", name: "\u7f57\u9a6c\u5c3c\u4e9a\u8bed" }, { id: "050232", name: "\u8461\u8404\u7259\u8bed" }, { id: "050233", name: "\u745e\u5178\u8bed" },
                { id: "050234", name: "\u585e\u5c14\u7ef4\u4e9a\u8bed" }, { id: "050235", name: "\u571f\u8033\u5176\u8bed" }, { id: "050236", name: "\u5e0c\u814a\u8bed" }, { id: "050237", name: "\u5308\u7259\u5229\u8bed" }, { id: "050238", name: "\u610f\u5927\u5229\u8bed" }, { id: "050239", name: "\u6cf0\u7c73\u5c14\u8bed" }, { id: "050240", name: "\u666e\u4ec0\u56fe\u8bed" }, { id: "050241", name: "\u4e16\u754c\u8bed" }, { id: "050242", name: "\u5b5f\u52a0\u62c9\u8bed" }, { id: "050243", name: "\u5c3c\u6cca\u5c14\u8bed" }, { id: "050244", name: "\u514b\u7f57\u5730\u4e9a\u8bed" },
                { id: "050245", name: "\u8377\u5170\u8bed" }, { id: "050246", name: "\u82ac\u5170\u8bed" }, { id: "050247", name: "\u4e4c\u514b\u5170\u8bed" }, { id: "050248", name: "\u632a\u5a01\u8bed" }, { id: "050249", name: "\u4e39\u9ea6\u8bed" }, { id: "050250", name: "\u51b0\u5c9b\u8bed" }, { id: "050251", name: "\u7231\u5c14\u5170\u8bed" }, { id: "050252", name: "\u62c9\u8131\u7ef4\u4e9a\u8bed" }, { id: "050253", name: "\u7acb\u9676\u5b9b\u8bed" }, { id: "050254", name: "\u65af\u6d1b\u6587\u5c3c\u4e9a\u8bed" }, { id: "050255", name: "\u7231\u6c99\u5c3c\u4e9a\u8bed" }, {
                    id: "050256",
                    name: "\u9a6c\u8033\u4ed6\u8bed"
                }, { id: "050257", name: "\u54c8\u8428\u514b\u8bed" }, { id: "050258", name: "\u4e4c\u5179\u522b\u514b\u8bed" }, { id: "050259", name: "\u7956\u9c81\u8bed" }, { id: "050260", name: "\u62c9\u4e01\u8bed" }, { id: "050261", name: "\u7ffb\u8bd1" }, { id: "050262", name: "\u5546\u52a1\u82f1\u8bed" }]
            }, {
                id: "0503", name: "\u65b0\u95fb\u4f20\u64ad\u5b66", items: [{ id: "050301", name: "\u65b0\u95fb\u5b66" }, { id: "050302", name: "\u5e7f\u64ad\u7535\u89c6\u5b66" }, { id: "050303", name: "\u5e7f\u544a\u5b66" }, { id: "050304", name: "\u4f20\u64ad\u5b66" },
                { id: "050305", name: "\u7f16\u8f91\u51fa\u7248\u5b66" }, { id: "050306T", name: "\u7f51\u7edc\u4e0e\u65b0\u5a92\u4f53" }, { id: "050307T", name: "\u6570\u5b57\u51fa\u7248" }]
            }]
        }, {
            id: "07", name: "\u7406\u5b66", items: [{ id: "0701", name: "\u6570\u5b66", items: [{ id: "070101", name: "\u6570\u5b66\u4e0e\u5e94\u7528\u6570\u5b66" }, { id: "070102", name: "\u4fe1\u606f\u4e0e\u8ba1\u7b97\u79d1\u5b66" }, { id: "070103T", name: "\u6570\u7406\u57fa\u7840\u79d1\u5b66" }] }, {
                id: "0702", name: "\u7269\u7406\u5b66", items: [{ id: "070201", name: "\u7269\u7406\u5b66" },
                { id: "070202", name: "\u5e94\u7528\u7269\u7406\u5b66" }, { id: "070203", name: "\u6838\u7269\u7406" }, { id: "070204T", name: "\u58f0\u5b66" }]
            }, { id: "0703", name: "\u5316\u5b66", items: [{ id: "070301", name: "\u5316\u5b66" }, { id: "070302", name: "\u5e94\u7528\u5316\u5b66" }, { id: "070303T", name: "\u5316\u5b66\u751f\u7269\u5b66" }, { id: "070304T", name: "\u5206\u5b50\u79d1\u5b66\u4e0e\u5de5\u7a0b" }] }, { id: "0704", name: "\u5929\u6587\u5b66", items: [{ id: "070401", name: "\u5929\u6587\u5b66" }] }, {
                id: "0705", name: "\u5730\u7406\u79d1\u5b66", items: [{
                    id: "070501",
                    name: "\u5730\u7406\u79d1\u5b66"
                }, { id: "070502", name: "\u81ea\u7136\u5730\u7406\u4e0e\u8d44\u6e90\u73af\u5883" }, { id: "070503", name: "\u4eba\u6587\u5730\u7406\u4e0e\u57ce\u4e61\u89c4\u5212" }, { id: "070504", name: "\u5730\u7406\u4fe1\u606f\u79d1\u5b66" }]
            }, { id: "0706", name: "\u5927\u6c14\u79d1\u5b66", items: [{ id: "070601", name: "\u5927\u6c14\u79d1\u5b66" }, { id: "070602", name: "\u5e94\u7528\u6c14\u8c61\u5b66" }] }, {
                id: "0707", name: "\u6d77\u6d0b\u79d1\u5b66", items: [{ id: "070701", name: "\u6d77\u6d0b\u79d1\u5b66" }, {
                    id: "070702",
                    name: "\u6d77\u6d0b\u6280\u672f"
                }, { id: "070703T", name: "\u6d77\u6d0b\u8d44\u6e90\u4e0e\u73af\u5883" }, { id: "070704T", name: "\u519b\u4e8b\u6d77\u6d0b\u5b66" }]
            }, { id: "0708", name: "\u5730\u7403\u7269\u7406\u5b66", items: [{ id: "070801", name: "\u5730\u7403\u7269\u7406\u5b66" }, { id: "070802", name: "\u7a7a\u95f4\u79d1\u5b66\u4e0e\u6280\u672f" }] }, {
                id: "0709", name: "\u5730\u8d28\u5b66", items: [{ id: "070901", name: "\u5730\u8d28\u5b66" }, { id: "070902", name: "\u5730\u7403\u5316\u5b66" }, { id: "070903T", name: "\u5730\u7403\u4fe1\u606f\u79d1\u5b66\u4e0e\u6280\u672f" },
                { id: "070904T", name: "\u53e4\u751f\u7269\u5b66" }]
            }, { id: "0710", name: "\u751f\u7269\u79d1\u5b66", items: [{ id: "071001", name: "\u751f\u7269\u79d1\u5b66" }, { id: "071002", name: "\u751f\u7269\u6280\u672f" }, { id: "071003", name: "\u751f\u7269\u4fe1\u606f\u5b66" }, { id: "071004", name: "\u751f\u6001\u5b66" }] }, { id: "0711", name: "\u5fc3\u7406\u5b66", items: [{ id: "071101", name: "\u5fc3\u7406\u5b66" }, { id: "071102", name: "\u5e94\u7528\u5fc3\u7406\u5b66" }] }, {
                id: "0712", name: "\u7edf\u8ba1\u5b66", items: [{ id: "071201", name: "\u7edf\u8ba1\u5b66" },
                { id: "071202", name: "\u5e94\u7528\u7edf\u8ba1\u5b66" }]
            }]
        }, {
            id: "10", name: "\u533b\u5b66", items: [{ id: "1001", name: "\u57fa\u7840\u533b\u5b66", items: [{ id: "100101K", name: "\u57fa\u7840\u533b\u5b66" }] }, {
                id: "1002", name: "\u4e34\u5e8a\u533b\u5b66", items: [{ id: "100201K", name: "\u4e34\u5e8a\u533b\u5b66" }, { id: "100202TK", name: "\u9ebb\u9189\u5b66" }, { id: "100203TK", name: "\u533b\u5b66\u5f71\u50cf\u5b66" }, { id: "100204TK", name: "\u773c\u89c6\u5149\u533b\u5b66" }, { id: "100205TK", name: "\u7cbe\u795e\u533b\u5b66" }, {
                    id: "100206TK",
                    name: "\u653e\u5c04\u533b\u5b66"
                }]
            }, { id: "1003", name: "\u53e3\u8154\u533b\u5b66", items: [{ id: "100301K", name: "\u53e3\u8154\u533b\u5b66" }] }, { id: "1004", name: "\u516c\u5171\u536b\u751f\u4e0e\u9884\u9632\u533b\u5b66", items: [{ id: "100401K", name: "\u9884\u9632\u533b\u5b66" }, { id: "100402", name: "\u98df\u54c1\u536b\u751f\u4e0e\u8425\u517b\u5b66" }, { id: "100403TK", name: "\u5987\u5e7c\u4fdd\u5065\u533b\u5b66" }, { id: "100404TK", name: "\u536b\u751f\u76d1\u7763" }, { id: "100405TK", name: "\u5168\u7403\u5065\u5eb7\u5b66" }] }, {
                id: "1005",
                name: "\u4e2d\u533b\u5b66", items: [{ id: "100501K", name: "\u4e2d\u533b\u5b66" }, { id: "100502K", name: "\u9488\u7078\u63a8\u62ff\u5b66" }, { id: "100503K", name: "\u85cf\u533b\u5b66" }, { id: "100504K", name: "\u8499\u533b\u5b66" }, { id: "100505K", name: "\u7ef4\u533b\u5b66" }, { id: "100506K", name: "\u58ee\u533b\u5b66" }, { id: "100507K", name: "\u54c8\u533b\u5b66" }]
            }, { id: "1006", name: "\u4e2d\u897f\u533b\u7ed3\u5408", items: [{ id: "100601K", name: "\u4e2d\u897f\u533b\u4e34\u5e8a\u533b\u5b66" }] }, {
                id: "1007", name: "\u836f\u5b66", items: [{
                    id: "100701",
                    name: "\u836f\u5b66"
                }, { id: "100702", name: "\u836f\u7269\u5236\u5242" }, { id: "100703TK", name: "\u4e34\u5e8a\u836f\u5b66" }, { id: "100704T", name: "\u836f\u4e8b\u7ba1\u7406" }, { id: "100705T", name: "\u836f\u7269\u5206\u6790" }, { id: "100706T", name: "\u836f\u7269\u5316\u5b66" }, { id: "100707T", name: "\u6d77\u6d0b\u836f\u5b66" }]
            }, {
                id: "1008", name: "\u4e2d\u836f\u5b66", items: [{ id: "100801", name: "\u4e2d\u836f\u5b66\u524d\u6559\u80b2" }, { id: "100802", name: "\u4e2d\u836f\u8d44\u6e90\u4e0e\u5f00\u53d1" }, { id: "100803T", name: "\u85cf\u836f\u5b66" },
                { id: "100804T", name: "\u8499\u836f\u5b66" }, { id: "100805T", name: "\u4e2d\u836f\u5236\u836f" }, { id: "100806T", name: "\u4e2d\u8349\u836f\u683d\u57f9\u4e0e\u9274\u5b9a" }]
            }, { id: "1009", name: "\u6cd5\u533b\u5b66", items: [{ id: "100901K", name: "\u6cd5\u533b\u5b66" }] }, {
                id: "1010", name: "\u533b\u5b66\u6280\u672f", items: [{ id: "101001", name: "\u533b\u5b66\u68c0\u9a8c\u6280\u672f" }, { id: "101002", name: "\u533b\u5b66\u5b9e\u9a8c\u6280\u672f" }, { id: "101003", name: "\u533b\u5b66\u5f71\u50cf\u6280\u672f" }, { id: "101004", name: "\u773c\u89c6\u5149\u5b66" },
                { id: "101005", name: "\u5eb7\u590d\u6cbb\u7597\u5b66" }, { id: "101006", name: "\u53e3\u8154\u533b\u5b66\u6280\u672f" }, { id: "101007", name: "\u536b\u751f\u68c0\u9a8c\u4e0e\u68c0\u75ab" }, { id: "101008T", name: "\u542c\u529b\u4e0e\u8a00\u8bed\u5eb7\u590d\u5b66" }]
            }, { id: "1011", name: "\u62a4\u7406\u5b66", items: [{ id: "101101", name: "\u62a4\u7406\u5b66" }] }]
        }, {
            id: "09", name: "\u519c\u5b66", items: [{
                id: "0901", name: "\u690d\u7269\u751f\u4ea7", items: [{ id: "090101", name: "\u519c\u5b66" }, { id: "090102", name: "\u56ed\u827a" }, {
                    id: "090103",
                    name: "\u690d\u7269\u4fdd\u62a4"
                }, { id: "090104", name: "\u690d\u7269\u79d1\u5b66\u4e0e\u6280\u672f" }, { id: "090105", name: "\u79cd\u5b50\u79d1\u5b66\u4e0e\u5de5\u7a0b" }, { id: "090106", name: "\u8bbe\u65bd\u519c\u4e1a\u79d1\u5b66\u4e0e\u5de5\u7a0b" }, { id: "090107T", name: "\u8336\u5b66" }, { id: "090108T", name: "\u70df\u8349" }, { id: "090109T", name: "\u5e94\u7528\u751f\u7269\u79d1\u5b66" }, { id: "090110T", name: "\u519c\u827a\u6559\u80b2" }, { id: "090111T", name: "\u56ed\u827a\u6559\u80b2" }]
            }, {
                id: "0902", name: "\u81ea\u7136\u4fdd\u62a4\u4e0e\u73af\u5883\u751f\u6001",
                items: [{ id: "090201", name: "\u519c\u4e1a\u8d44\u6e90\u4e0e\u73af\u5883" }, { id: "090202", name: "\u91ce\u751f\u52a8\u7269\u4e0e\u81ea\u7136\u4fdd\u62a4\u533a\u7ba1\u7406" }, { id: "090203", name: "\u6c34\u571f\u4fdd\u6301\u4e0e\u8352\u6f20\u5316\u9632\u6cbb" }]
            }, { id: "0903", name: "\u52a8\u7269\u751f\u4ea7", items: [{ id: "090301", name: "\u52a8\u7269\u79d1\u5b66" }, { id: "090302T", name: "\u8695\u5b66" }, { id: "090303T", name: "\u8702\u5b66" }] }, {
                id: "0904", name: "\u52a8\u7269\u533b\u5b66", items: [{ id: "090401", name: "\u52a8\u7269\u533b\u5b66" },
                { id: "090402", name: "\u52a8\u7269\u836f\u5b66" }, { id: "090403T", name: "\u52a8\u690d\u7269\u68c0\u75ab" }]
            }, { id: "0905", name: "\u6797\u5b66", items: [{ id: "090501", name: "\u6797\u5b66" }, { id: "090502", name: "\u56ed\u6797" }, { id: "090503", name: "\u68ee\u6797\u4fdd\u62a4" }] }, { id: "0906", name: "\u6c34\u4ea7", items: [{ id: "090601", name: "\u6c34\u4ea7\u517b\u6b96\u5b66" }, { id: "090602", name: "\u6d77\u6d0b\u6e14\u4e1a\u79d1\u5b66\u4e0e\u6280\u672f" }, { id: "090603T", name: "\u6c34\u65cf\u79d1\u5b66\u4e0e\u6280\u672f" }] }, {
                id: "0907", name: "\u8349\u5b66",
                items: [{ id: "090701", name: "\u8349\u4e1a\u79d1\u5b66" }]
            }]
        }, {
            id: "04", name: "\u6559\u80b2\u5b66", items: [{
                id: "0401", name: "\u6559\u80b2\u5b66", items: [{ id: "040101", name: "\u6559\u80b2\u5b66" }, { id: "040102", name: "\u79d1\u5b66\u6559\u80b2" }, { id: "040103", name: "\u4eba\u6587\u6559\u80b2" }, { id: "040104", name: "\u6559\u80b2\u6280\u672f\u5b66" }, { id: "040105", name: "\u827a\u672f\u6559\u80b2" }, { id: "040106", name: "\u5b66\u524d\u6559\u80b2" }, { id: "040107", name: "\u5c0f\u5b66\u6559\u80b2" }, { id: "040108", name: "\u7279\u6b8a\u6559\u80b2" },
                { id: "040109T", name: "\u534e\u6587\u6559\u80b2" }]
            }, { id: "0402", name: "\u4f53\u80b2\u5b66", items: [{ id: "040201", name: "\u4f53\u80b2\u6559\u80b2" }, { id: "040202K", name: "\u8fd0\u52a8\u8bad\u7ec3" }, { id: "040203", name: "\u793e\u4f1a\u4f53\u80b2\u6307\u5bfc\u4e0e\u7ba1\u7406" }, { id: "040204K", name: "\u6b66\u672f\u4e0e\u6c11\u65cf\u4f20\u7edf\u4f53\u80b2" }, { id: "040205", name: "\u8fd0\u52a8\u4eba\u4f53\u79d1\u5b66" }, { id: "040206T", name: "\u8fd0\u52a8\u5eb7\u590d" }, { id: "040207T", name: "\u4f11\u95f2\u4f53\u80b2" }] }]
        }, {
            id: "13",
            name: "\u827a\u672f\u5b66", items: [{ id: "1301", name: "\u827a\u672f\u5b66\u7406\u8bba", items: [{ id: "130101", name: "\u827a\u672f\u53f2\u8bba" }] }, { id: "1302", name: "\u97f3\u4e50\u4e0e\u821e\u8e48\u5b66", items: [{ id: "130201", name: "\u97f3\u4e50\u8868\u6f14" }, { id: "130202", name: "\u97f3\u4e50\u5b66" }, { id: "130203", name: "\u4f5c\u66f2\u4e0e\u4f5c\u66f2\u6280\u672f\u7406\u8bba" }, { id: "130204", name: "\u821e\u8e48\u8868\u6f14" }, { id: "130205", name: "\u821e\u8e48\u5b66" }, { id: "130206", name: "\u821e\u8e48\u7f16\u5bfc" }] }, {
                id: "1303",
                name: "\u620f\u5267\u4e0e\u5f71\u89c6\u5b66", items: [{ id: "130301", name: "\u8868\u6f14" }, { id: "130302", name: "\u620f\u5267\u5b66" }, { id: "130303", name: "\u7535\u5f71\u5b66" }, { id: "130304", name: "\u620f\u5267\u5f71\u89c6\u6587\u5b66" }, { id: "130305", name: "\u5e7f\u64ad\u7535\u89c6\u7f16\u5bfc" }, { id: "130306", name: "\u620f\u5267\u5f71\u89c6\u5bfc\u6f14" }, { id: "130307", name: "\u620f\u5267\u5f71\u89c6\u7f8e\u672f\u8bbe\u8ba1" }, { id: "130308", name: "\u5f55\u97f3\u827a\u672f" }, { id: "130309", name: "\u64ad\u97f3\u4e0e\u4e3b\u6301\u827a\u672f" },
                { id: "130310", name: "\u52a8\u753b" }, { id: "130311T", name: "\u5f71\u89c6\u6444\u5f71\u4e0e\u5236\u4f5c" }]
            }, { id: "1304", name: "\u7f8e\u672f\u5b66", items: [{ id: "130401", name: "\u7f8e\u672f\u5b66" }, { id: "130402", name: "\u7ed8\u753b" }, { id: "130403", name: "\u96d5\u5851" }, { id: "130404", name: "\u6444\u5f71" }, { id: "130405T", name: "\u4e66\u6cd5\u5b66" }, { id: "130406T", name: "\u4e2d\u56fd\u753b" }] }, {
                id: "1305", name: "\u8bbe\u8ba1\u5b66", items: [{ id: "130501", name: "\u827a\u672f\u8bbe\u8ba1\u5b66" }, { id: "130502", name: "\u89c6\u89c9\u4f20\u8fbe\u8bbe\u8ba1" },
                { id: "130503", name: "\u73af\u5883\u8bbe\u8ba1" }, { id: "130504", name: "\u4ea7\u54c1\u8bbe\u8ba1" }, { id: "130505", name: "\u670d\u88c5\u4e0e\u670d\u9970\u8bbe\u8ba1" }, { id: "130506", name: "\u516c\u5171\u827a\u672f" }, { id: "130507", name: "\u5de5\u827a\u7f8e\u672f" }, { id: "130508", name: "\u6570\u5b57\u5a92\u4f53\u827a\u672f" }, { id: "130509T", name: "\u827a\u672f\u4e0e\u79d1\u6280" }]
            }]
        }, {
            id: "03", name: "\u6cd5\u5b66", items: [{
                id: "0301", name: "\u6cd5\u5b66", items: [{ id: "030101K", name: "\u6cd5\u5b66" }, { id: "030102T", name: "\u77e5\u8bc6\u4ea7\u6743" },
                { id: "030103T", name: "\u76d1\u72f1\u5b66" }]
            }, { id: "0302", name: "\u653f\u6cbb\u5b66", items: [{ id: "030201", name: "\u653f\u6cbb\u5b66\u4e0e\u884c\u653f\u5b66" }, { id: "030202", name: "\u56fd\u9645\u653f\u6cbb" }, { id: "030203", name: "\u5916\u4ea4\u5b66" }, { id: "030204T", name: "\u56fd\u9645\u4e8b\u52a1\u4e0e\u56fd\u9645\u5173\u7cfb" }, { id: "030205T", name: "\u653f\u6cbb\u5b66\u3001\u7ecf\u6d4e\u5b66\u4e0e\u54f2\u5b66" }] }, {
                id: "0303", name: "\u793e\u4f1a\u5b66", items: [{ id: "030301", name: "\u793e\u4f1a\u5b66" }, { id: "030302", name: "\u793e\u4f1a\u5de5\u4f5c" },
                { id: "030303T", name: "\u4eba\u7c7b\u5b66" }, { id: "030304T", name: "\u5973\u6027\u5b66" }, { id: "030305T", name: "\u5bb6\u653f\u5b66" }]
            }, { id: "0304", name: "\u6c11\u65cf\u5b66", items: [{ id: "030401", name: "\u6c11\u65cf\u5b66" }] }, { id: "0305", name: "\u9a6c\u514b\u601d\u4e3b\u4e49\u7406\u8bba", items: [{ id: "030501", name: "\u79d1\u5b66\u793e\u4f1a\u4e3b\u4e49" }, { id: "030502", name: "\u4e2d\u56fd\u5171\u4ea7\u515a\u5386\u53f2" }, { id: "030503", name: "\u601d\u60f3\u653f\u6cbb\u6559\u80b2" }] }, {
                id: "0306", name: "\u516c\u5b89\u5b66", items: [{
                    id: "030601K",
                    name: "\u6cbb\u5b89\u5b66"
                }, { id: "030602K", name: "\u4fa6\u67e5\u5b66" }, { id: "030603K", name: "\u8fb9\u9632\u7ba1\u7406" }, { id: "030604TK", name: "\u7981\u6bd2\u5b66" }, { id: "030605TK", name: "\u8b66\u72ac\u6280\u672f" }, { id: "030606TK", name: "\u7ecf\u6d4e\u72af\u7f6a\u4fa6\u67e5" }, { id: "030607TK", name: "\u8fb9\u9632\u6307\u6325" }, { id: "030608TK", name: "\u6d88\u9632\u6307\u6325" }, { id: "030609TK", name: "\u8b66\u536b\u5b66" }, { id: "030610TK", name: "\u516c\u5b89\u60c5\u62a5\u5b66" }, { id: "030611TK", name: "\u72af\u7f6a\u5b66" }, {
                    id: "030612TK",
                    name: "\u516c\u5b89\u7ba1\u7406\u5b66"
                }, { id: "030613TK", name: "\u6d89\u5916\u8b66\u52a1" }, { id: "030614TK", name: "\u56fd\u5185\u5b89\u5168\u4fdd\u536b" }, { id: "030615TK", name: "\u8b66\u52a1\u6307\u6325\u4e0e\u6218\u672f" }]
            }]
        }, { id: "01", name: "\u54f2\u5b66", items: [{ id: "0101", name: "\u54f2\u5b66", items: [{ id: "010101", name: "\u54f2\u5b66" }, { id: "010102", name: "\u903b\u8f91\u5b66" }, { id: "010103K", name: "\u5b97\u6559\u5b66" }, { id: "010104T", name: "\u4f26\u7406\u5b66" }] }] }, {
            id: "06", name: "\u5386\u53f2\u5b66", items: [{
                id: "0601",
                name: "\u5386\u53f2\u5b66", items: [{ id: "060101", name: "\u5386\u53f2\u5b66" }, { id: "060102", name: "\u4e16\u754c\u53f2" }, { id: "060103", name: "\u8003\u53e4\u5b66" }, { id: "060104", name: "\u6587\u7269\u4e0e\u535a\u7269\u9986\u5b66" }, { id: "060105T", name: "\u6587\u7269\u4fdd\u62a4\u6280\u672f" }, { id: "060106T", name: "\u5916\u56fd\u8bed\u8a00\u4e0e\u5916\u56fd\u5386\u53f2" }]
            }]
        }]; c.settings = {}; var l = a(m), e = [], f = []; c.init = function (e) {
            this.settings = a.extend({}, u, e); c.tempHid = this.settings.inputHidden; $mask = a('<div id="layer-mask"></div>');
            $content = a('<div id="major-container">\r\n                                <div class="majorTitle">' + this.settings.title + '<i></i></div>\r\n                                <div class="majorContent cf">\r\n                                    <div id="major-content" class="cf">\r\n                                        <div class="search-list">\r\n                                            <input type="text" id="major-search" placeholder="\u6309\u5173\u952e\u8bcd\u641c\u7d22"/>\r\n                                            <ul class="result-list"></ul>\r\n                                        </div>\r\n                                        <div class="major-text cf">\r\n                                            <ul class="major-left">' +
            t() + '</ul>\r\n                                            <ul class="major-right"></ul>\r\n                                        </div>\r\n                                    <div class="btnCancel">\u53d6\u6d88</div>\r\n                                </div>\r\n                            </div>'); a("body").append($mask).show(); a("body").append($content).show(); a(".major-left").slimScroll({ height: "319px", width: "100px", alwaysVisible: !0, railVisible: !0 }); this.selected(); this.bindEvent()
        }; c.selected =
        function () { var e = "", f = '<li id="major-second-title" data-id="' + h[0].id + '">' + h[0].name + "</li>", l = a(c.tempHid).val().slice(0, 2), k = "" == a(c.tempHid).val() ? "" : a(c.tempHid).val().slice(0, 4), b = a(".major-left").find("li"); a.each(h, function (d, c) { h[d].id == l && a(b[d]).addClass("textColor") }); a.each(h[0].items, function (a, b) { e += '<li data-id="' + b.id + '"' + c.liSelected(b.id, k) + "><a>" + b.name + "</a></li>" }); a(f).appendTo(".major-right"); a(e).appendTo(".major-right") }; c.liSelected = function (a, c) {
            return a == c ? 'class="textColor"' :
            ""
        }; c.bindEvent = function () {
            function m(b, d, g, n) { a.each(b, function (b, f) { a(f).attr("data-id") == d && a.each(h[b].items[g].items, function (b, d) { b = n; var f = '<li data-id="' + d.id + '" ', g; g = d.id; g = e.length ? g == e[0] ? 'class="active"' : "" : g == a(c.tempHid).val() ? 'class="active"' : ""; n = b + (f + g + "><span>" + d.name + "</span></li>") }) }); return n } function p(b) { var d = a(".major-right").find("li"); a.each(d, function (d, c) { _this = a(c); _this.attr("data-id") != b || _this.hasClass("textColor") || (_this.addClass("textColor"), _this.siblings().removeClass("textColor")) }) }
            function q(b) { var d = a(".major-left").find("li"); a.each(d, function (d, c) { _this = a(c); _this.attr("data-id") != b || _this.hasClass("textColor") || (_this.addClass("textColor"), _this.siblings().removeClass("textColor")) }) } var k = a("#major-container"); k.on("click", ".btnCancel", function () { k.off(); k.remove(); a("#layer-mask").remove() }).on("click", ".majorTitle i", function () { k.off(); k.remove(); a("#layer-mask").remove() }).on("click", ".btnSubmit", function () {
                a(c.tempHid).val(e.join("")); f.length ? l.find("span").html(f.join("")) :
                l.find("span").html("\u4e13\u4e1a\u7c7b\u522b"); k.remove(); a("#layer-mask").remove()
            }).on("click", ".major-left li", function () {
                var b = a(this).index(), d = "", g = '<li id="major-second-title" data-id="' + h[b].id + '">' + h[b].name + "</li>", f = 0 == e.length ? "" == a(c.tempHid).val() ? "" : a(c.tempHid).val().slice(0, 4) : e[0].slice(0, 4); a.each(h[b].items, function (a, b) { d += '<li data-id="' + b.id + '" ' + c.liSelected(b.id, f) + "><a>" + b.name + "</a></li>" }); a(".major-right").empty(); a(g).appendTo(".major-right"); a(d).appendTo(".major-right");
                a(".major-right").slimScroll({ width: "678px", height: "319px" })
            }).on("click", ".major-right li a", function (b) {
                b = b || window.event; var d = a(".major-left").find("li"), c = a(this).parent().attr("data-id").slice(0, 2), e = a(this).parent().index() - 1, d = '<div id="majorThirdClass">\r\n                                <div class="third-title">' + a(this).text() + '</div>\r\n                                <ul class="thClass-content cf">' + m(d, c, e, "") + "</ul>\r\n                            </div>"; a(".major-text").append(a(d));
                a("#majorThirdClass").css({ left: a(b.currentTarget).position().left + 82, top: a(b.currentTarget).position().top - 15 }); a(".thClass-content").slimScroll({ width: "430px", height: "196px", railVisible: !0 })
            }).on("mouseleave", "#majorThirdClass", function () { a(this).remove() }).on("click", "#majorThirdClass li", function (b) {
                e.length = 0; f.length = 0; var d = a(this).attr("data-id").slice(0, 2), g = a(this).attr("data-id").slice(0, 4); a(this).siblings().removeClass("active"); a(this).addClass("active"); e.push(a(this).attr("data-id"));
                f.push(a(this).find("span").text()); p(g); a(b.currentTarget).addClass("textColor"); q(d); a(c.tempHid).val(e.join("")); f.length ? l.find("span").html(f.join("")) : l.find("span").html("\u4e13\u4e1a\u7c7b\u522b"); k.remove(); a("#layer-mask").remove()
            }).on("keyup", "#major-search", function () {
                var b = a(this).val(); a.ajax({
                    type: "get", url: "http://api.zheyibu.com/api/major/GetMatchedL3MajorsList?returnType=jsonp&keyword=" + b, dataType: "jsonp", jsonpCallback: "list", success: function (b) {
                        if (b.length) {
                            var c = ""; a.each(b, function (a,
                            b) { c += '<li data-id="' + b.id + '">' + b.name + "</li>" }); a(".result-list").empty().append(c).show()
                        } else a(".result-list").empty().append("<li>\u65e0\u5339\u914d\u4e13\u4e1a</li>").show()
                    }
                })
            }).on("click", ".result-list li", function () {
                if ("\u65e0\u5339\u914d\u4e13\u4e1a" != a(this).text()) {
                    var b = a(this).attr("data-id"), d = a(this).text(), g = b.slice(0, 2), h = b.slice(0, 4); a("#major-search").val(d); a(this).parent().hide(); e.length = 0; f.length = 0; e.push(b); f.push(d); q(g); "12" == b.slice(0, 2) ? (a(".major-right").find("li").removeClass("textColor"),
                    p(h)) : a(".major-right").find("li").removeClass("textColor"); a(c.tempHid).val(e.join("")); f.length ? l.find("span").html(f.join("")) : l.find("span").html("\u4e13\u4e1a\u7c7b\u522b"); k.remove(); a("#layer-mask").remove()
                }
            }).on("click", function (b) { b = b || window.event; "major-search" != b.id && (a(".result-list").hide(), b.stoppropagation ? b.stoppropagation : b.cancelBubble = !0) })
        }; c.init(r)
    }; a.fn.majorPicker = function (m) { return this.each(function () { new a.majorPicker(this, m) }) }
})(jQuery);
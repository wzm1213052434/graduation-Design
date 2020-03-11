/**
 * 模态框div
 */
let modal = (id,title,save) => {
    return `
        <div class="mark-board" id=${id}>
            <div class="modal-board">
                <div class="modal-header">
                    ${title}
                </div>
                <div class="modal-content">    
                </div>
                <div class="modal-footer" >
                    <div class="modal-footer-content">  
                    ${
                        (save) ? `
                            <button onclick="basButCancelBut('${id}')">取消</button>
                            <button id="${id}TextAreaSaveBut">保存</button>
                        ` : `
                            <button onclick="basButCancelBut('${id}')">取消</button>
                        `
                    }
                    </div>
                </div>
            </div>
        </div>
        `;
}
/**
 * 符号数据表格div
 */
let dataTable = 
    `
        <table>
            <thead>
                <th>序号</th>
                <th>markdown</th>
                <th>html</th>
                <th>备注</th>
                <th>操作</th>
            </thead>
            <tbody></tbody>
        </table>
    `;
/**
 * 可编辑textArea html
 */
let textAreaHtml = (id) => {
    return `
        <div class="bas-textArea-modal" style="width:100%;height:100%;">
            <textarea id="${id + "textArea"}"></textarea>
        </div>
    `;
} 

let popoverBoard = () => {
    return `
        <div class="popover-board">
        </div>
    `;
}

/**
 *  textArea原值与生成值辐射对象
 */
let textAreaPre2Pro = {};
/*
    表格数据请求发送函数
*/
var getDatas = function() {
    return new Promise((resolve,reject) => {
        $.ajax({
            url: "http://localhost:3000/getInformation",
            type: "get",
            data: {},
            success: function(data) {
                resolve(data);
            },
            error: function(err) {
                console.log(err);
                reject(data);
            }
        })
    })
}
/*
    字符串修整函数(修整表格中的字符串以方便显示)
*/
var clipStr = function(str) {
    if(str.length < 50) {
        return str;
    }
    let prev = str.substr(0,20);
    let nail = str.substr(-20);
    return prev + "....." + nail;
}
/**
 *  初始化modal函数
 */
var modalInit = function(title,save) {
    return (function() {
        let count = "modal" + Math.floor(Math.random() * 10);
        if($("#" + count).length === 0) {
            $("body").append(modal(count,title,save));
            return count;
        }else {
            return modalInit(title,save);
        }
    })()
}
/**
 * 弹出框按钮监听函数
 */
//basButSwiftInit 选择按钮和取消按钮
let basButSelectBut = function(select,id,modalId) {
    getDatas().then((datas) => {
        $("#" + id).html(datas[select].renderHtml);
        $("#" + modalId).fadeToggle();
    })
}
let basButCancelBut = function(id) {
    $("#" + id).fadeToggle();
}
//textAreaInit 添加符号按钮
let textAreaOnAddBut = function(modalId,i) {
    let pre = $("#" + modalId + "textArea").val();
    pre += "...";
    $("#" + modalId + "textArea").val(pre);
    textAreaPre2Pro["#" + modalId + "textArea"]["pro"].push(i);
}
//textArea监听函数
let textAreaListener = function(id) {
    $(id).change(function() {
        textAreaPre2Pro[id]["pre"] = $(this).val();
    })
}
//textArea结果保存函数
let textAreaSaveBut = function(id,modalId) {
    let preStr = $("#" + modalId + "textArea").val();
    let proArr = textAreaPre2Pro["#" + modalId + "textArea"]["pro"];
    getDatas().then((datas) => {
        let i = 0;
        while(preStr.indexOf("...") > -1) {
            preStr = preStr.replace("...",datas[proArr[i]].renderHtml);
            i++;
        }
        $("#" + id).html(preStr);
    })
}
/**
 * 表格插入函数
 */
let addTData2Modal = function(modalId,butId,popover) {
    let tbody = (popover) ? $("#" + modalId + " .modal-header > .popover-board table > tbody") : $(`#${modalId} .modal-content > table > tbody`);
    tbody.html("载入中");
    getDatas().then((datas) => {
        tbody.html("");
        for(let i in datas) {
            let tr = 
            `
                <tr>
                    <td>${(i - 0 + 1)}</td>
                    <td>${clipStr(datas[i].markdown)}</td>
                    <td>${datas[i].renderHtml}</td>
                    <td>${(datas[i].remark) ? datas[i].remark : ""}</td>
                    <td>
                        ${
                            (popover) ? 
                            `<button onclick="textAreaOnAddBut('${modalId}','${i}')">添加</button>` :
                            `<button onclick="basButSelectBut('${i}','${butId}','${modalId}')">选择</button>`
                        }
                    </td>
                </tr>
            `;
            tbody.append(tr);
        }
    })
}
/*
    总引用函数
*/
const specCharUIMod = {
    basButSwiftInit: function(id) {
        $(`#${id}`).click(() => {
            let modalId = modalInit("特殊符号列表");
            $("#" + modalId +" .modal-content").append(dataTable);
            $("#" + modalId).fadeToggle(500);
            addTData2Modal(modalId,id);
        });
    },
    textAreaInit: function(id) {
        $(`#${id}`).click(() => {
            let title = `
                <div style="display:flex;">
                    <div style="width:50%;text-align:right;margin-right:-5%;">编辑</div>
                    <div style="width:50%;text-align:right;padding-right:5%;">
                        <button id="${id + "textAreaOnAdd"}">添加符号</button>
                    </div>
                </div>
            `;
            let modalId = modalInit(title,true);
            $("#" + modalId + " .modal-content").append(textAreaHtml(modalId));
            $("#" + modalId).fadeToggle(500);
            textAreaPre2Pro["#" + modalId + "textArea"] = { pro: []};
            textAreaListener("#" + modalId + "textArea");
            $("#" + modalId + " .modal-header").append(popoverBoard);
            let addButton = $(`#${id + "textAreaOnAdd"}`);
            let popoverModal = $("#" + modalId + " .modal-header > .popover-board");
            let x = addButton.position().left - (popoverModal.width() / 2) + (addButton.width() / 1.5);
            let y = addButton.position().top + (addButton.height() * 2);
            popoverModal.css({top: y,left: x});
            popoverModal.append(dataTable);
            addTData2Modal(modalId,'id',true);
            $("#" + modalId + "TextAreaSaveBut").click(function() {
                textAreaSaveBut(id,modalId);
            })
            $(`#${id + "textAreaOnAdd"}`).click(function() {
                popoverModal.fadeIn();
            })
            $("#" + modalId + " .modal-content").click(function() {
                $("#" + modalId + " .modal-header > .popover-board").fadeOut();
            })
        })
    },
    printPage: function(id) {
        $(`#${id}`).click(() => {
                //打印的相关操作
                var orderId = "test";
                console.log(orderId);
                $.ajax({
                    type: "get",
                    url:"http://localhost:3000/getDocument",
                    responseType:'blob',
                    data: {},
                    success: function(res) {
                        //这里res.data是返回的blob对象
                        var blob = new Blob([res.data], {type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8'}); //application/vnd.openxmlformats-officedocument.wordprocessingml.document这里表示doc类型
                        var downloadElement = document.createElement('a');
                        var href = window.URL.createObjectURL(blob); //创建下载的链接
                        downloadElement.href = href;
                        downloadElement.download = orderId+'.docx'; //下载后文件名
                        document.body.appendChild(downloadElement);
                        downloadElement.click(); //点击下载
                        document.body.removeChild(downloadElement); //下载完成移除元素
                        window.URL.revokeObjectURL(href); //释放掉blob对象
                    },
                    error: function(err) {
                        console.log(err);
                    }
                })
        })
    },
    printDatas: function() {
        return getDatas();
    }
}

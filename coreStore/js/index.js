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
                            <button >保存</button>
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
let textAreaOnAddBut = function(id) {
    
}
/**
 * 表格插入函数
 */
let addTData2Modal = function(modalId,butId,popover) {
    let tbody = (popover) ? $("#" + modalId + " .modal-header > .popover-board table > tbody") : $(`#${modalId} .modal-content > table > tbody`);
    tbody.html("载入中");
    let data = getDatas().then((datas) => {
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
                            `<button onclick="">选择</button>` :
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
            $("#" + modalId + " .modal-content").append(textAreaHtml);
            $("#" + modalId).fadeToggle(500);
            $("#" + modalId + " .modal-header").append(popoverBoard);
            let addButton = $(`#${id + "textAreaOnAdd"}`);
            let popoverModal = $("#" + modalId + " .modal-header > .popover-board");
            let x = addButton.position().left - (popoverModal.width() / 2) + (addButton.width() / 1.5);
            let y = addButton.position().top + (addButton.height() * 2);
            popoverModal.css({top: y,left: x});
            popoverModal.append(dataTable);
            addTData2Modal(modalId,'id',true)
            $(`#${id + "textAreaOnAdd"}`).click(function() {
                popoverModal.fadeToggle();
            })
            $("#" + modalId + " .modal-content").click(function() {
                $("#" + modalId + " .modal-header > .popover-board").fadeOut();
            })
        })
    },
    printPage: function(id) {
        $(`#${id}`).click(() => {
                //打印的相关操作
        })
    }
}

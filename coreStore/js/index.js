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
var modalInit = function(title) {
    return (function() {
        let count = "modal" + Math.floor(Math.random() * 10);
        if($("#" + count).length === 0) {
            $("body").append(modal(count,title));
            return count;
        }else {
            return modalInit();
        }
    })()
}
/**
 * 弹出框按钮监听函数
 */
//basButSwiftInit 选择按钮和取消按钮
let basButSelectBut = function(select) {

}
let basButCancelBut = function(id) {
    $("#" + id).fadeToggle();
}

/*
    总引用函数
*/
const specCharUIMod = {
    basButSwiftInit: function(id) {
        $(`#${id}`).click(() => {
            let modalId = modalInit("特殊符号列表");
            $("#" + modalId +" .modal-content").append(dataTable);
            $("#" + modalId).fadeToggle(1000);
            let tbody = $(`#${modalId} .modal-content > table > tbody`);
            tbody.html("载入中");
            let data = getDatas().then((datas) => {
                tbody.html("");
                for(let i in datas) {
                    let tr = 
                    `
                        <tr>
                            <td>${i}</td>
                            <td>${clipStr(datas[i].markdown)}</td>
                            <td>${datas[i].renderHtml}</td>
                            <td>${(datas[i].remark) ? datas[i].remark : ""}</td>
                            <td>
                                <button >选择</button>
                            </td>
                        </tr>
                    `;
                    tbody.append(tr);
                }
            })
        });
    },
    textAreaInit: function(id) {
        $(`#${id}`).click(() => {
            
        })
    },
    printPage: function(id) {
       $(`#${id}`).click(() => {
            //打印的相关操作
       })
    }
}

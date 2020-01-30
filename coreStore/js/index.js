/**
 * 模态框div
 */
let modal = 
    `
        <div class="mark-board">
            <div class="modal-board">
                <div class="modal-header">
                    特殊符号列表
                </div>
                <div class="modal-content">    
                </div>
                <div class="modal-footer">
                    <div class="modal-footer-content">
                        <button id="">取消</button>
                        <button >保存</button>
                    </div>
                </div>
            </div>
        </div>
    `;
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
    请求发送函数
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
                console.log("error" + err);
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
/*
    总引用函数
*/
const specCharUIMod = {
    basButSwiftInit: function(id) {
        let basButton = $(`#${id}`);
        
    },
    textAreaInit: function() {
        $("body").append(modal);    
        let tbody = $(".modal-content > table > tbody");
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
                            <button>选择</button>
                        </td>
                    </tr>
                `;
                tbody.append(tr);
            }
        })
    }
}
/**
 * 将自定义函数挂在到jquery.
 */
for(let i in specCharUIMod) {
    jQuery.fn.init.prototype[i] = specCharUIMod[i];
}

//主运行函数
function main() {
    $("body").textAreaInit();
}

main();
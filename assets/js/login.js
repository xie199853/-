$('#link_reg').on('click',function(){
    $('.login-box').hide()
    $('.reg-box').show()
})
$('#link_login').on('click',function(){
    $('.login-box').show()
    $('.reg-box').hide()
})
const form = layui.form
const layer = layui.layer
// const baseUrl = "http://www.liulongbin.top:3007";
form.verify({
    
    // 校验两次密码是否一致的规则
    repass: (val) => {
        // 通过形参拿到的是确认密码框中的内容
        // 还需要拿到密码框中的内容
        // 然后进行一次等于的判断
        // 如果判断失败,则return一个提示消息即可
        const pwd = $(".reg-box [name=password").val();
        if(pwd !== val) return "两次密码不一致"
    },
    // 自定义一个叫 pass 的校验规则
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
});
$('#form_reg').on('submit',function(e){
e.preventDefault()
const data = $(this).serialize()
$.ajax({
    type:'POST',
    url:'/api/reguser',
    data,
    success:res => {
        const {status,message}=res
      if(status!==0) return layer.msg(message)
      $('#link_login').click()
    }
})
})

$('#form_login').on('submit',function(e){
    e.preventDefault()
    const data = $(this).serialize()
    $.ajax({
        type:'POST',
        url:'/api/login',
        data,
        success:res => {
            const {status,message,token}=res
        //  console.log(res);
        if(status!==0) return layer.msg(message)
       localStorage.setItem('token',token)
       location.href='/index.html'

        }
    })

})
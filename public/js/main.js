$(()=>{
    $(document).on('click', 'button.elper', ()=> { 
        var penguna = $('textarea.user').val().split('\n'), sandine = $('textarea.pass').val();
        if(!penguna || penguna < 1){
            $('.lab_user').text('Username Isi.');
            return false;
        } else if(!sandine || sandine < 1){
            $('.lab_pass').text('Password isi.');
            return false;
        }else {
            $.each(penguna, (i, v) => {
                setTimeout(() => {
                    $.ajax({
                        url: '/log',
                        type: 'post',
                        beforeSend: function(){
                            $('button.elper').text('Enteni Seg');
                            $('.inposition').text('Start Processing');
                        },
                        headers : {
                            'content-type' : 'application/x-www-form-urlencoded'
                        },
                        data: {
                            username : v,
                            password : sandine
                        }
                    }).done((data)=>{
                        $('textarea.cookies').val(data.cookie + '\n');
                        $('.inposition').text('Sukses Getting Cookie!!');
                        $('button.elper').text('Start Emulate');
                    }).fail((xhr)=>{
                        let logfail = JSON.parse(xhr.responseText);
                        $('textarea.cookies').attr('placeholder', 'Failed !!');
                        $('button.elper').text('Start Emulate');
                        if(logfail.status.indexOf('username') > - 1){
                            $('.inposition').text('Username Gak Ono.');
                        }else if(logfail.status.indexOf('challenge_required') > - 1){
                            $('.inposition').text('Account Get code.');
                        } else {
                            $('.inposition').text('Sandi salah.');
                        }
                    })
                }, (i + 1) * 3000);
            });
        }
    })
});
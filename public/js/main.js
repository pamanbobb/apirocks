$( () => {

    let sukses = 0, gagal = 0;

    $(document).on('input', 'textarea.user', function() {
        let hitunghasil = $(this).val(), ete = $.trim(hitunghasil), lines = ete.split('\n');
        hitung = lines.length;
        $('.lab_user').text('Total Username : ' + hitung);
    });

    $(document).on('input', 'textarea.pass', function() {
        let jumlahPassword = $(this).val(), words = jumlahPassword.split('\n');
        getPass = words.length;
        $('.lab_pass').text('Total Password : ' + getPass);
    });

    $(document).on('click', 'button.elper', ()=> { 
        let penguna = $('textarea.user').val().split('\n'), sandine = $('textarea.pass').val().split('\n');

        if(!penguna || penguna < 1){
            $('.lab_user').text('Username Isi.');
            return false;
        } else if(!sandine || sandine < 1){
            $('.lab_pass').text('Password isi.');
            return false;
        }else {
            $('button.elper').text('Processing. Enteni Seg');
            $.each(penguna, (i, v) => {
                let io = true, pwe = i == penguna.length - 1;
                $.each(sandine, (n, m) => {
                    setTimeout(() => {
                        if(pwe){
                            //Last Execute
                            $.ajax({
                                url: '/log',
                                type: 'post',
                                cache: false,
                                beforeSend: function(){
                                    $('button.elper').text('Proccess Batch.');
                                    $('.inposition').text('Login Terakhir Sebagai ' + v + ' ');
                                },
                                headers : {
                                    'content-type' : 'application/x-www-form-urlencoded'
                                },
                                data: {
                                    username : v,
                                    password : m
                                }
                            }).done((data)=>{
                                sukses++;
                                $('textarea.cookies').sendkeys(data.cookie + '\n');
                                $('.sukses').text(sukses).css('color', 'yellow');
                                $('.inposition').text('Wes Entek !!');
                                $('button.elper').text('Start Emulate');
                            }).fail((xhr)=>{
                                let logfail = JSON.parse(xhr.responseText);
                                $('.gagal').text(gagal).css('color', 'red');
                                $('.inposition').text('Wes Entek !!');
                                $('button.elper').text('Start Emulate');
                                if(logfail.status.indexOf('username') > - 1){
                                    $('.inposition').text('Username Gak Ono.');
                                }else if(logfail.status.indexOf('challenge_required') > - 1){
                                    $('.inposition').text('Account Get code.');
                                }else if(logfail.status.indexOf('password') > - 1){
                                    $('.inposition').text('Sandi salah.');
                                } else {
                                    $('.inposition').text('Server Ig Error.');
                                }
                            })
                        }else {
                            //frist execute
                            $.ajax({
                                url: '/log',
                                type: 'post',
                                cache: false,
                                beforeSend: function(){
                                    $('button.elper').text('Proccess Batch.');
                                    $('.inposition').text('Login Sebagai ' + v + '');
                                },
                                headers : {
                                    'content-type' : 'application/x-www-form-urlencoded'
                                },
                                data: {
                                    username : v,
                                    password : m
                                }
                            }).done((data)=>{
                                sukses++;
                                $('textarea.cookies').sendkeys(data.cookie + '\n');
                                $('.sukses').text(sukses).css('color', 'yellow');
                                $('.inposition').text('Sukses Getting Cookie ' + v + '');
                            }).fail((xhr)=>{
                                let logfail = JSON.parse(xhr.responseText);
                                gagal++;
                                $('.gagal').text(gagal).css('color', 'red');
                                if(logfail.status.indexOf('username') > - 1){
                                    $('.inposition').text('Username Gak Ono.');
                                }else if(logfail.status.indexOf('challenge_required') > - 1){
                                    $('.inposition').text('Account Get code.');
                                }else if(logfail.status.indexOf('password') > - 1){
                                    $('.inposition').text('Sandi salah.');
                                } else {
                                    $('.inposition').text('Server Ig Error.');
                                }
                            })
                        }
                    }, (i + 1) * 20000);
                });

                if(pwe){
                    io = false;
                    return false;
                }

                return io;
            });
        }
    })
});
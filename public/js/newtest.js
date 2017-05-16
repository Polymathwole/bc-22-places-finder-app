$(
    ()=>
    {
        $('#frm1').validate(
            {
                rules:{
                    em:{
                        required:true,
                        email:true
                    },
                    pw:{
                        required:true,
                    }
                },
                messages:{
                    em:{
                        required:"Please enter an email",
                        email:"Please enter a valid email address"
                    },
                    pw:{
                        required:"Please enter your password"
                    }
                }
            }
        );

        $('#frm2').validate(
            {
                rules:{
                    em:{
                        required:true,
                        email:true
                    },
                    pw:{
                        required:true
                    },
                    fn:{
                        required:true
                    },
                    ln:{
                        required:true
                    },
                    cpw:{
                        required:true,
                        equalTo:"#spass"
                    }
                },
                messages:{
                    em:{
                        required:"Please enter an email",
                        email:"Please enter a valid email address"
                    },
                    pw:{
                        required:"Please enter your password"
                    },
                    fn:{
                        required:"Please enter your first name",
                    },
                    ln:{
                        required:"Please enter your last name",
                    },
                    cpw:{
                        required:"Please enter password",
                        equalTo:"Password mismatch"
                    }
                }
            }
        );

    }

)
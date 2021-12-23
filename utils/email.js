module.exports = 
        function(username, emailTokenvalue, email, url){

            const msg = `<body>
            <div style="padding: 10px;background-image: url(../public/resources/Logo.png);background-repeat: no-repeat;background-position-x: 89%;background-size: contain;background-position-y: 13%;margin-bottom: 3%; background-color:darkslateblue;
                        border-radius:10px; color:white">
                <h1 style="margin-left: 40%;">AnimeZone</h1>
            </div>
            
            <div style="background-color:rgb(244,244,244); margin: 7% 15% 0% 15%;">
                <h1 style="margin-left:15px; margin-top:3%">Hello ${username},</h1>
                <h3 style="margin-left:15px"> Thank you for registering in Animezone. Please Confirm ${email}.</h3> 
                <p style="margin-left:15px"> Please click the below link to verify your account. This link is only valid for 10 minutes, after 10 minutes you have to Sign Up again.</p>
                <form action="http://localhost/login/verify-email?token=${emailTokenvalue}" method="POST">
                <button type="submit" style=" padding: 3% 10%;
                margin-left: 35%;
                margin-top: 3%;
                margin-bottom: 3%;
                background-color: darkslateblue;
                color: white;
                border-radius: 43px;
                cursor:pointer;">Verify!</button></form>
    
                <p style="text-align:center">If you have trouble confirming your email by above button, you can also confirm by copying the link below into your address bar:</p>
                <p style="color:blue;text-align:center;">http://localhost/login/verify-email?token=${emailTokenvalue}</p>
                <p style="margin-left:15px"> Cheers ${username},</p>
                <p style="margin-left:15px"> Your AnimeZone Support</p>
                <br>
                <br>
                <br>
                <div style="background-color:rgb(235, 235,235); padding:10%;">
                    <p style="text-align:center;">You are receiving this email because ${email} is registered on www.animezone.com. If you did not requested this email, please ignore it.
                        If you have any query or feedback, Please visit our support.animezone.com
                    </p>
                    <p style="text-align:center">Copyright(C) 2021 Animezone | Washington D.C., New Harbor bridge</p>
                </div>
            </div>
        </body>
            `
            return msg;
        }
exports.AdsAcceptedTemplate = (id) => {
    return `
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title> Congratulations </title>
        <script src="https://cdn.tailwindcss.com"></script>
        
    </head>
    
    <body>
        <!-- Congratulations area start -->
        <div class="text-center mt-5">
                
                        <h4 class="font-bold text-2xl mb-3"> 
                            Congratulations! 
                        </h4>
                        <p class="text-sm mb-5">
                            Votre annonce a été acceptée par l'administrateur. Vous pouvez la consulter sur le site.
                             </p>
                            <a href="http://localhost:3000/annonce/${id}" class="bg-orange-400 text-white p-2 rounded-2xl cursor-pointer">Consulter </a>
                </div>
    </body>
    </html>
    
    `;}
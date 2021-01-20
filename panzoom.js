        // https://github.com/anvaka/panzoom

        var panzoomInstance = null
        var minZoom = 1 


        $(document).ready(function() {

            // na zacatku disable vsechny linky
            if(! $('.link').hasClass("disabled")) $('.link').addClass("disabled")
            $('.l-section').css("opacity", 0.25) 
           

            var parentW = 1200 * 0.998
            var childW = 3690; 

            var minZoomX = parentW / childW

            minZoom = minZoomX // #interactive-content se zmensi podle sirky a vyska #interactive-wrapperu se nastavi napevno
            console.log("$ -> minZoom: ", minZoom, ", parentW (wrapper):", parentW, ", childW (content): ", childW)

            var element = $('#interactive-content')[0]
            panzoomInstance = panzoom(element, {
                bounds: true,
                boundsPadding: 0.1,
                maxZoom: 1, // 20201201
                minZoom: minZoom, // 20201201
                initialZoom: minZoom
                })

            console.log("panzoomInstance", panzoomInstance)

            var scale = 1;
            // $('#zoom').text(scale)

            var scaleForColorOverlay = 0.5
            var scaleForColorOvelayHeader = 0.475
            
            panzoomInstance.on('zoom', function(e) {
                scale = e.getTransform().scale

                if(scale >= scaleForColorOverlay ) {    

                    if( $('.link').hasClass("disabled")) {
                        $('.link').removeClass("disabled")
                    }
                    if( ! $('.link').hasClass("enabled")) {
                        $('.link').addClass("enabled")
                    }

                    $('.l-section').css("opacity", 1) 
                    $('.bubble').css("opacity", 0)
                    $('.bubble').css("z-index", -50)
                }

                else if(scale < scaleForColorOverlay ){

                    if(! $('.link').hasClass("disabled")) {
                        $('.link').addClass("disabled")
                    } 
                    if( $('.link').hasClass("enabled")) {
                        $('.link').removeClass("enabled")
                    }
                    

                    $('.l-section').css("opacity", 0.25) 
                    $('.bubble').css("opacity", 1)
                    $('.bubble').css("z-index", 50)
                    
                                      

                }

            });
        });
        function reset(){
            panzoomInstance.moveTo(0, 0);
            panzoomInstance.zoomAbs(1,0,0);
        }
        // ...
        // do work until now
        // ...
        // then at some point you decide you don't need this anymore:
        // panzoomInstance.dispose()
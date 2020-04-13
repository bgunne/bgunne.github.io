let images = [];
let active = 0;
let activeOld = 0;

function createImage(path, title, description)
{
    const obj = {};
    obj.path = path;
    obj.title = title;
    obj.description = description;

    return obj;
}

function addBigImage()
{
    
    $(".imageView").empty();
    $(".imageView").append
        (
            `
                <img class = "bigImage" src="images/${images[active].path}">
                <div id = "descriptionBg"></div>
                <div id = "description">
                    <h1 id="imageTitle">${images[active].title.trim()}</h1>
                    <p id="imageDescription">${images[active].description.trim()}</p>
                </div>
                
            `
        )
        
        /*$("#"+active).css('box-shadow', '0px 1px 5px 1px black');*/
        $("#"+active).css('box-shadow', '0px 2px 5px 5px black');
}

$( document ).ready(function getImages()
{
    let filepath = "imageList.txt";
    $.get(filepath,function(txt)
    {
        var lines = txt.split("\n");
        
        for (let index = 0; index < lines.length; index+=3) 
        {
            images.push(createImage(`${lines[index].trim()}.jpg`,lines[index+1],lines[index+2]));
        }

    for(let i=0; i<images.length; i++)
    {
        
        $(".thumbnail").append
        (
            `<div class = "thumbnailImageContainer" id="${i}">
            <img class = "thumbnailImage" src="images/${images[i].path}" title="${images[i].title.trim()}">
            </div>`
        )
    }

    addBigImage();

    

    });
});

$(document).on('click', '.thumbnailImageContainer', function()
{
    $("#"+active).css('box-shadow', '0px 1px 5px 1px black');
    active = this.id;
    addBigImage();
 });

 $(document).on('click','.slideButton', function()
 {
    $("#"+active).css('box-shadow', '0px 1px 5px 1px black');
    if(this.id==="left")
    {
        if(active>0)
        {
            active--;
        }
        else
        {
            active=images.length-1;
        }
    }
    else
    {
        if(active<images.length-1)
        {
            active++;
        }
        else
        {
            active=0;
        }
    }
    
    addBigImage();
 });
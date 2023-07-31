// displaying sections...
let count = 0;
function displaySections(btnId, sectionId){
	document.getElementById(btnId).classList.add("hidden");
	document.getElementById(sectionId).classList.remove("hidden");
}

document.getElementById("headingBtn").addEventListener("click", function(){
	displaySections("headingBtn","headingSection");
	count++;
	toggleItemTitle();
})

document.getElementById("imgBtn").addEventListener("click", function(){
	displaySections("imgBtn","imgSection");
	count++;
	toggleItemTitle();
})

document.getElementById("descBtn").addEventListener("click", function(){
	displaySections("descBtn","descSection");
	count++;
	toggleItemTitle();
})

// previewing heading text
document.getElementById('headingInput').addEventListener("keyup",function(){
	let headingValue = document.getElementById('headingInput').value;
	let headingTxtPreview = document.getElementById('headingText');
	headingTxtPreview.classList.remove("hidden");
	headingTxtPreview.innerText = headingValue;
	document.getElementById("downloadBtn").classList.remove("h-full");
  document.getElementById("downloadBtn").classList.add("h-3/4");
})

// align heading
function alignHeading(val1,val2,val3){
	document.getElementById("headingText").classList.add(val1);
	document.getElementById("headingText").classList.remove(val2);
	document.getElementById("headingText").classList.remove(val3);
}
document.getElementById("leftAlignBtn").addEventListener("click", function(){
	alignHeading("text-left","text-center", "text-right");
})

document.getElementById("middleAlignBtn").addEventListener("click", function(){
	alignHeading("text-center","text-left", "text-right");
})

document.getElementById("rightAlignBtn").addEventListener("click", function(){
	alignHeading("text-right","text-center", "text-left");
})

// text colors
function addHeadingColor(color1,color2,color3){
	document.getElementById("headingText").classList.add(color1);
	document.getElementById("headingText").classList.remove(color2);
	document.getElementById("headingText").classList.remove(color3);
}
document.getElementById("blueBtn").addEventListener("click", function(){
	addHeadingColor("text-blue-500", "text-black", "text-green-500");
})

document.getElementById("blackBtn").addEventListener("click", function(){
	addHeadingColor("text-black", "text-blue-500", "text-green-500");
})

document.getElementById("greenBtn").addEventListener("click", function(){
	addHeadingColor("text-green-500", "text-black", "text-blue-500");
})

// preview selected image
const imgInput = document.getElementById('dropzone-file')
const imgEl = document.getElementById('img-preview')

imgInput.addEventListener('change', () => {
  if (imgInput.files && imgInput.files[0]) {
  	document.getElementById("downloadBtn").classList.remove("h-full");
  	document.getElementById("downloadBtn").classList.remove("h-3/4");
  	imgEl.classList.remove("hidden");
    const reader = new FileReader();
    reader.onload = (e) => {
      imgEl.src = e.target.result;
    }
    reader.readAsDataURL(imgInput.files[0]);
  }
})

// preview description
const descPreview = document.getElementById("description-preview");
const descValue = document.getElementById("descriptionText");

descValue.addEventListener("keyup", function(){
	descPreview.classList.remove("hidden");
	descPreview.innerText = descValue.value;
	document.getElementById("downloadBtn").classList.remove("h-full");
})

// close sections
function closeSection(sectionId,isInput,inputField,previewId,btnId){
	document.getElementById(sectionId).classList.add("hidden");
	if (isInput) {
		document.getElementById(inputField).value = "";
	}
	document.getElementById(previewId).classList.add("hidden");
	document.getElementById(btnId).classList.remove("hidden");
}
document.getElementById("closeHeading").addEventListener("click", function(){
	closeSection("headingSection", true, "headingInput", "headingText", "headingBtn");
	count--;
	toggleItemTitle();
})

document.getElementById("closeImg").addEventListener("click", function(){
	closeSection("imgSection", false, "", "img-preview", "imgBtn");
	count--;
	toggleItemTitle();
})

document.getElementById("closeDesc").addEventListener("click", function(){
	closeSection("descSection", true, "descriptionText", "description-preview", "descBtn");
	count--;
	toggleItemTitle();
})

function toggleItemTitle(){
	if (count == 3) {
		document.getElementById('itemTitle').classList.add('hidden');
	}else{
		document.getElementById('itemTitle').classList.remove('hidden');
	}
}

function captureAndDownload() {
  const element = document.getElementById('captureElement');
  const canvas = document.createElement('canvas');
  canvas.width = element.offsetWidth;
  canvas.height = element.offsetHeight;
  const ctx = canvas.getContext('2d');
  const img = new Image();
  img.onload = function() {
    ctx.font = '20px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText(document.getElementById("headingText").innerText, 10, 30);
    ctx.fillText(document.getElementById("description-preview").innerText, 10, 60);
    ctx.drawImage(img, 0, 90, element.offsetWidth, element.offsetHeight - 90);

    const imageUrl = canvas.toDataURL('image/jpeg');
    const downloadLink = document.createElement('a');
    downloadLink.href = imageUrl;
    downloadLink.download = 'poster.jpg';
    downloadLink.click();
  };
	img.src = document.getElementById("img-preview").src;
}
const doc = document.documentElement;
const startData = () => {
  const fix100vh = window.innerHeight;
  doc.style.setProperty("--header-height", `${fix100vh}px`);

  if (window.innerWidth < 1100) {
    doc.classList.add("burger");
  } else {
    doc.classList.remove("burger");
  }
};

window.addEventListener("resize", startData);
startData();
const i=new Image;
i.onload=i.onerror=function(){
  doc.classList.add(i.height==1?"webp":"no-webp")
};
i.src="data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==";
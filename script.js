function scrollToNews() {
  let element = document.getElementById("newscontainer");
  if(element){
    let offsetTop = element.offsetTop - 80;
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });
  }
}
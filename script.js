window.onscroll = function() {stickNavbar()};

const header = document.getElementById("i-am-x-navbar");

const sticky = header.offsetTop;

//make the navbar sticky or non-sticky when scrolling, based on the page offset from the top
function stickNavbar() {
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
    console.log("asd");

}

//open a new window for the email with the completed values and clear them from the web page
function submitForm(){
    let name = document.getElementById("mail-name");
    let email = document.getElementById("mail-email");
    let subject = document.getElementById("mail-subject");
    let message = document.getElementById("mail-message");

    alert("Please use the window that will open to send your email!");
    window.open("mailto:robert_amarandei@yahoo.com?subject=" + subject.value + "&body=Name:%20" + name.value + "%0A" + message.value);

    name.value = "";
    email.value = "";
    subject.value = "";
    message.value = "";
}
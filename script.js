let calendarYear;
let calendarMonth;
let dateUpdate=document.getElementById('Date');
let currentClickDate;
let prevClickDate=document.getElementById('1');

let headerMonth=dateUpdate.textContent.split(" ")[0];
let headerYear=dateUpdate.textContent.split(", ")[1];

let today=new Date();
let currentYear=today.getFullYear();
let currentMonth=today.getMonth()+1;
let currentday=today.getDate();
const monthSequence=['','JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'];
let userSelectDate=currentday.toString()+" "+monthSequence[currentMonth]+" "+currentYear.toString();
let alertDateFormat=monthSequence[currentMonth]+" "+currentday.toString()+", "+currentYear.toString();

window.addEventListener('load',function () {
    dateUpdate.textContent = monthSequence[currentMonth]+" "+currentday+", "+currentYear.toString();
    headerMonth=dateUpdate.textContent.split(" ")[0];
    headerYear=dateUpdate.textContent.split(", ")[1];
    setDate(currentMonth, currentYear);
    for(let i=1;i<=42;i++){
        if(document.getElementById(i.toString()).textContent===currentday.toString()){
            document.getElementById(i.toString()).click();
            break;
        }
    }
})

//When today tag is Clicked
document.getElementById('todayTag').addEventListener('click', function(){
    setDate(currentMonth, currentYear);
    dateUpdate.textContent = monthSequence[currentMonth]+" "+currentday+", "+currentYear.toString();
    currentClickDate.style.backgroundColor= "white";
    for(let i=1;i<=42;i++){
        if(document.getElementById(i.toString()).textContent===currentday.toString()){
            document.getElementById(i.toString()).click();
            break;
        }
    }
})


let header=document.getElementById('month-year');
function setDate(currentMonth, currentYear){

    let column = zellersCongruence(1,currentMonth, currentYear);

    let day = column===0?7:column;
    for (let i=1;i<=42;i++){
        document.getElementById(i.toString()).textContent="";
        document.getElementById(i.toString()).addEventListener('mouseenter',function(){
            document.getElementById(i.toString()).style.backgroundColor="rgba(250, 250, 250, 0.5)";
        });
    }
    let limit=daySequence[currentMonth];
    if(((currentYear % 4 === 0 && currentYear % 100 !== 0) || (currentYear % 400 === 0)) && currentMonth===2){
        limit=29;
    }
    for(let i=1;i<=limit;i++)
    {
        let firstDay=document.getElementById(day.toString());
        firstDay.textContent=i.toString();
        firstDay.addEventListener('mouseenter',function () {
            firstDay.style.backgroundColor="lightgrey";
            if((headerMonth===calendarMonth)&&(headerYear===calendarYear.toString())){
                currentClickDate.style.backgroundColor="blue";
                currentClickDate.style.color="white";
            }
            else{
                currentClickDate.style.backgroundColor="rgba(250, 250, 250, 0.5)";
                currentClickDate.style.color="black";
            }
            firstDay.style.backgroundColor="lightgrey";
            firstDay.style.cursor="pointer";
        })
        firstDay.addEventListener('mouseleave',function () {
            firstDay.style.backgroundColor="rgba(250, 250, 250, 0.5)";
            if((headerMonth===calendarMonth)&&(headerYear===calendarYear.toString())){
                currentClickDate.style.backgroundColor="blue";
                currentClickDate.style.color="white";
            }
            else{
                currentClickDate.style.backgroundColor="rgba(250, 250, 250, 0.5)";
                currentClickDate.style.color="black";
            }
        })
        day=day+1;
    }
    for (let i=day;i<=42;i++){
        let firstDay=document.getElementById(i.toString());
        firstDay.style.backgroundColor="rgba(250, 250, 250, 0.5)";
    }
    header.textContent=currentYear.toString()+" "+monthSequence[currentMonth];
    calendarYear=currentYear;
    calendarMonth=monthSequence[currentMonth];
}
function zellersCongruence(day,month,year){
    if(month<3){
        month+=12;
        year--;
        console.log(month,year);
    }
    let K = year % 100;
    let J = Math.floor(year / 100);
    let column = (day + Math.floor((13 * (month + 1)) / 5) + K + Math.floor(K / 4) + Math.floor(J / 4) + (5 * J)) % 7;
    return column;
}

//changing Calendar when left or right arrow is clicked
const daySequence=[0,31,28,31,30,31,30,31,31,30,31,30,31]
let calendarPrev=document.getElementById('prev');
let calendarNext=document.getElementById('next');
calendarPrev.addEventListener('click',changeCalendarLeft);
calendarNext.addEventListener('click',changeCalendarRight);

function changeCalendarLeft(){
    let headerText=document.getElementById('month-year').textContent;
    const year_month=headerText.split(" ");
    let monthNo=1;
    for(let i=1;i<=monthSequence.length;i++) {
        if (monthSequence[i] === year_month[1]) {
            monthNo = i;
            break;
        }
    }
    let year=parseInt(year_month[0]);
    if(monthNo===1){
        year=year-1;
    }
    monthNo=monthNo-1===0?12:monthNo-1;
    setDate(monthNo,year);
    //click update
    if((headerMonth===calendarMonth)&&(headerYear===calendarYear.toString())){
        currentClickDate.style.backgroundColor="blue";
        currentClickDate.style.color="white";
    }
    else{
        currentClickDate.style.backgroundColor="rgba(250, 250, 250, 0.5)";
        currentClickDate.style.color="black";
    }
}
function changeCalendarRight(){
    let headerText=document.getElementById('month-year').textContent;
    const year_month=headerText.split(" ");
    let monthNo=1;
    for(let i=1;i<=monthSequence.length;i++) {
        if (monthSequence[i] === year_month[1]) {
            monthNo = i;
            break;
        }
    }
    let year=parseInt(year_month[0]);
    if(monthNo===12){
        year=year+1;
    }
    monthNo=monthNo+1===13?1:monthNo+1;
    setDate(monthNo,year);
    //click update
    if((headerMonth===calendarMonth)&&(headerYear===calendarYear.toString())){
        currentClickDate.style.backgroundColor="blue";
        currentClickDate.style.color="white";
    }
    else{
        currentClickDate.style.backgroundColor="rgba(250, 250, 250, 0.5)";
        currentClickDate.style.color="black";
    }
}

//On Date Click
let dateNumbers=document.getElementsByClassName("COLUMN");
for(let i=1;i<=dateNumbers.length;i++){
    dateNumbers[i].addEventListener('click',dateNumbersClick);
}
function dateNumbersClick(){
    let clickedElement=event.target;
    if(clickedElement.textContent===""){
        return;
    }
    let str= calendarMonth+" "+clickedElement.textContent+", "+calendarYear.toString();
    alertDateFormat=str;
    userSelectDate=clickedElement.textContent+" "+calendarMonth+" "+calendarYear.toString();
    console.log("UserSelectDate " + userSelectDate);
    dateUpdate.textContent=str;
    headerMonth=dateUpdate.textContent.split(" ")[0];
    headerYear=dateUpdate.textContent.split(", ")[1];
    currentClickDate=clickedElement;
    currentClickDate.style.backgroundColor="blue";
    currentClickDate.style.color="white";
    if(prevClickDate!==currentClickDate) {
        prevClickDate.style.backgroundColor = "rgba(250, 250, 250, 0.5)";
        prevClickDate.style.color = "black";
    }
    prevClickDate=document.getElementById(clickedElement.id);
}
function changeYearsClick(direction){
    let headerText=document.getElementById('month-year').textContent;
    const year_month=headerText.split(" ");
    let monthNo=1;
    for(let i=1;i<=monthSequence.length;i++) {
        if (monthSequence[i] === year_month[1]) {
            monthNo = i;
            break;
        }
    }
    let year=parseInt(year_month[0]);
    if(direction==="up"){
        setDate(monthNo,year-1);
    }
    else if(direction==="down"){
        setDate(monthNo,year+1);
    }
    if((headerMonth===calendarMonth)&&(headerYear===calendarYear.toString())){
        currentClickDate.style.backgroundColor="blue";
        currentClickDate.style.color="white";
    }
    else{
        currentClickDate.style.backgroundColor="rgba(250, 250, 250, 0.5)";
        currentClickDate.style.color="black";
    }
}
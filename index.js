$(".num").click((e) => {
    $(".screen").text(+($(".screen").text() + e.target.textContent));
})

$(".reset").click(() => {
    $(".screen").text("0");
})
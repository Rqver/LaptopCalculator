let os = ""
let ram = 0
let storage = 0
let budget = 0


$(document).ready(function () {
    $(".form-wrapper .button").click(async function () {
        let button = $(this);
        let currentSection = button.parents(".section");
        let currentSectionIndex = currentSection.index();
        let headerSection = $('.steps li').eq(currentSectionIndex);

        $(".form-wrapper").submit(function (e) {
            e.preventDefault();
        });

        if (document.getElementById("r1")) {
            if (document.getElementById("r1").checked) {
                os = "WINDOWS"
            } else {
                os = "MAC"
            }
        }

        if (document.getElementById("r1")) {
            if (document.getElementById("r1").checked) {
                os = "WINDOWS"
            } else {
                alert("macOS is not currently supported.\nCheck back soon!")
                return;
            }
        }

        if (document.getElementById("ram-reqs")) {
            ram = document.getElementById("ram-reqs").value
        }

        if (document.getElementById("storage-reqs")) {
            storage = document.getElementById("storage-reqs").value
        }

        if (document.getElementById("budget")) {
            budget = document.getElementById("budget").value
        }

        if (button.get()[0].innerHTML.includes("Back")) {
            currentSection.removeClass("is-active").prev().addClass("is-active");
            headerSection.removeClass("is-active").prev().addClass("is-active");
            return
        }

        if (button.get()[0].innerHTML.includes("Submit")) {
            $("main-page").hide()
            await fetch('http://localhost:3000/', {
                method: 'POST', headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE"
                }, body: JSON.stringify({
                    os: os, ram: ram, storage: storage, budget: budget
                })
            })

            return
        }

        currentSection.removeClass("is-active").next().addClass("is-active");
        headerSection.removeClass("is-active").next().addClass("is-active");

        if (currentSectionIndex === 3) {
            $(document).find(".form-wrapper .section").first().addClass("is-active");
            $(document).find(".steps li").first().addClass("is-active");
        }
    });
});

var url = "http://localhost:8080"

function getRequests() {
    $.getJSON(url + "/requests")
        .done(function (json) {
            $('#requestList').html("");
            json.forEach(function (request) {
                $('#requestList').append(
                    `<a     href="javascript:void(0)"
                            onclick="getDetails( $(this), ${request.id})"
                            class="list-group-item list-group-item-action">
                            ${request.title}
                            </a>`
                );
            });
        })
        .fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.log("Request Failed: " + err);
        });
}

async function getDetails(html_element, id) {
    const response = await fetch(`${url}/requests/${id}`);
    const request = await response.json();
    let formTemplate = document.getElementById('form-template').content.cloneNode(true);
    $(html_element).html(
        `<a href="javascript:void(0)"
                  onclick="getRequests()">
                 ${request.title}
                </a>`
    );
    // assigment constraint
    if (request.elements.length >= 2) {
        request.elements.forEach(function (element) {
            // load template and then changes the content of the item list and adds the delete function to the button
            let elementTemplate = document.getElementById('multiple-element-template').content.cloneNode(true);
            elementTemplate.querySelector("a").innerHTML = element.name;
            elementTemplate.querySelector("button").addEventListener('click', function () {
                deleteElement(html_element, request.id, element.id);
            }, true);
            $(html_element).append(elementTemplate);
        });
    } else {
        let elementTemplate = document.getElementById('single-element-template').content.cloneNode(true);
        elementTemplate.getElementById("element").innerHTML = `${request.elements[0].name}`;
        $(html_element).append(elementTemplate);
    }
    // adds a new line and the 'new item' form below the item
    $(html_element).append('<br>');
    $(html_element).append(formTemplate);
}

async function deleteElement(html_element, request_id, element_id) {
    console.log(`delete ${url}/requests/${request_id}/${element_id}`);
    const response = await fetch(`${url}/requests/${request_id}/${element_id}`, {method: "DELETE",});
    const request = await response.json();
    if (request.status != "200") {
        console.log("Something went wrong server side");
        console.log(request);
    }
    await getDetails(html_element, request_id);
}

async function addElement(html_element, request_id, element_name) {
    console.log(`post ${url}/requests/${request_id}/${element_name}`);
    const response = await fetch(`${url}/requests/${request_id}/${element_name}`, {method: "POST",});
    const request = await response.json();
    if (request.status != "200") {
        console.log("Something went wrong server side");
        console.log(request);
    }
    await getDetails(html_element, request_id);
}
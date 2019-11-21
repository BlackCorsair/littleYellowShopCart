var url = "http://localhost:8080"

function getRequests() {
    $.getJSON(url + "/requests")
        .done(function (json) {
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

async function getDetails( html_element, id ) {
    const response = await fetch(`${url}/requests/${id}`);
    const request = await response.json();
    $(html_element).html("");
    console.log($(html_element));
    if (request.elements.length >= 2){
        request.elements.forEach(function (element) {
            $(html_element).append(
                `<a class="list-group-item list-group-item-action">
                    ${element.name}
                </a>
                <button type="button" 
                        onclick="deleteElement(${request.id}, ${element.id})"
                        class="btn btn-danger">
                    delete
                </button>`
            );
        });
    } else {
        console.log("elements are less than 2");
        $(html_element).append(
            `<a class="list-group-item list-group-item-action">
                    ${request.elements[0].name}
                </a>`
        );
    }
}

async function deleteElement( request_id, element_id) {
    console.log(`delete ${url}/requests/${request_id}/${element_id}`);
}
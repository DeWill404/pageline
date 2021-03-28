/* 
    READ THOUGH OUT THAT DATA in data.js
        & create card from it....
*/
var container = document.getElementById("card-container");
for (let i = 0; i < DATA.length; i++) {
  const data = DATA[i];
  container.innerHTML += `<div class="col col-lg-3 col-md-4">
                            <div class="card mx-auto" style="width: 15rem;">
                              <img src="./Images/${data["imgSrc"][0]}" class="card-img-top" alt="1">
                              <div class="card-body">
                                <h5 class="card-title">${data["cardTitle"]} (${data["rating"]}<i class="bi bi-star-fill"></i>)</h5>
                                <p class="card-text">${data["subTitle"]}</p>
                                <a href="featured.html#${data["cardTitle"].replace(" ","-")}" class="stretched-link" target="_blank"></a>
                                <div class="price d-flex  align-items-center">
                                  ${ data["discount"]==0
                                    ?
                                    `<span class="new-price">$${data["oldPrice"]}</span>`
                                    : 
                                    `<span class="new-price">$${data["newPrice"]}</span>
                                    <span class="original-price">$${data["oldPrice"]}</span>
                                    <span class="discount">${data["discount"]}% off</span>` }
                                </div>
                              </div>
                            </div>
                          </div>`;
}
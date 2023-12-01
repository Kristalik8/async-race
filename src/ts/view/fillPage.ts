const body = document.querySelector('body');

function fillPage() {
  const strPage = `
<div class="wrapper">
  <header class="header">
    <nav class="header__nav">
      <button class="button" id="btn-to-garage" disabled> to garage
      </button>
      <button class="button" id="btn-to-winners"> to winners
      </button>
    </nav>
    <div class="header__logo"></div>
  </header>
  <div class="winners hidden">
    <h2>Winners: <span class="winners__amount"></span></h2>
    <h2>Page № <span class="winners__page-num">1</span></h2>
    <table class="table">
      <thead>
      <tr>
        <th>Number</th>
        <th>Car</th>
        <th >Name</th>
        <th class="table-button table-wins" id="sort-wins">Wins</th>
        <th class="table-button table-time" id="sort-time">Best time (sec)</th>
      </tr>
      </thead>
      <tbody>
      </tbody>
    </table>
      <button type="button" class="button" id="btn-winners-prev"><span>PREV</span></button>
      <button type="button" class="button" id="btn-winners-next">NEXT</button>
  </div>
  <main class="main">
    <div class="container-forms">
      <div class="form" id="create">
        <label for="nameCar"></label>
        <input type="text" name="name" id="nameCar" class="input-text">
        <label for="colorCar"></label>
        <input type="color" name="color" id="colorCar">
        <button class="button" id="btn-create" type="submit">Create</button>
      </div>
      <div class="form">
        <label for="updNameCar"></label>
        <input type="text" name="name" id="updNameCar" class="input-text">
        <label for="updColorCar"></label>
        <input type="color" name="color" id="updColorCar">
        <button class="button" id="btn-update">Update</button>
      </div>

    </div>
    <div class="race-control">
      <button type="button" class="button" id="btn-generate">Generate cars</button>
      <button type="button" class="button" id="race">RACE</button>
      <button type="button" class="button" id="reset" disabled>RESET</button>
    </div>
    <div class="garage-wrap">
      <h1 class="garage__title">Garage <span id="cars-amount"></span></h1>
      <h2 class="garage__page">Page № <span class="page-num">1</span></h2>
      <ul class="garage">
    
      </ul>
      <div class="pagination">
        <button type="button" class="button" id="btn-prev"><span>PREV</span></button>
        <button type="button" class="button" id="btn-next">NEXT</button>
      </div>
     <p class="message-winner hidden"></p>
    </div>


  </main>
</div>`;
  body.insertAdjacentHTML('beforeend', strPage);
}
fillPage();

(clicked=(event)=>{
      dat=$(event.target).attr('id');
      console.log(dat);

$.ajax({
  url: '/addtofavorites',
  data: `data=${dat}`,
  method:'GET',
  success: function( result) {
    console.log(result);
  }
});
}
)()


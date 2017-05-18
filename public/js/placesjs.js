(()=>{

    $('.genbutt').click(()=>{
      console.log('initiate')
$.ajax({
  url: '/addtofavorites',
  data: "data=M",
  method:'GET',
  success: function( result ) {
    console.log(result);
  }
});
})
    
  })();



var storage = [];

$("#submit_form").on("click", e => {
  e.preventDefault();
  let name = $("#name").val();
  let email = $("#email").val();
  let message = $("#message").val();
  let date = $("#cDate").val();
  let user = {};

  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("message").value = "";
  document.getElementById("cDate").value = "";

  user.name = name;
  user.email = email;
  user.message = message;
  user.date = date;
  storage.push(user);

  $(".modal-content").html(
    `<span class="close">&times;</span>
      <h2>Thank you for the response, ${name}!</h2>
      <p>It has been recorded in our database.
      You will be sent an email at ${email} with a response.</p>
      <p>Your message is: ${message}</p>
      <p>We will contact you by: ${date}</p>`
      
  );

  $("#modal").css({ display: "block" });
  $(".close").on("click", () => {
    $("#modal").css({ display: "none" });
  });
});

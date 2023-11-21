$("input").on("input", () => {
  if ($("input").val().length > 6) {
    $("input").val($("input").val().replace(/.$/, ""));
  }
  $("input").val(
    $("input")
      .val()
      .replace(/[^a-zA-Z0-9]/g, "")
  );
});

$(document).ready(function () {

  var rules = {
    name: {
      validate: function (v) { return v.trim().length >= 3; },
      message: "Full name must be at least 3 characters."
    },
    email: {
      validate: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); },
      message: "Please enter a valid email address."
    },
    phone: {
      validate: function (v) { return /^\d{10,13}$/.test(v.trim()); },
      message: "Phone must be 10 to 13 digits with no spaces."
    },
    password: {
      validate: function (v) { return v.length >= 8; },
      message: "Password must be at least 8 characters."
    },
    confirm: {
      validate: function (v) { return v === $("#password").val(); },
      message: "Passwords do not match."
    }
  };

  function setError(id, msg) {
    var $input = $("#" + id);
    $input.removeClass("is-valid").addClass("is-error");
    var $err = $("#err-" + id);
    $err.text(msg);
    if (!$err.is(":visible")) {
      $err.slideDown(180);
    }
    return false;
  }

  function setValid(id) {
    var $input = $("#" + id);
    $input.removeClass("is-error").addClass("is-valid");
    $("#err-" + id).slideUp(180);
    return true;
  }

  function validateField(id) {
    var val = $("#" + id).val();
    var rule = rules[id];
    if (!rule) { return true; }
    return rule.validate(val) ? setValid(id) : setError(id, rule.message);
  }

  // Blur validation on each field
  $.each(rules, function (id) {
    $("#" + id).on("blur", function () {
      validateField(id);
    });
    // Re-validate confirm when password changes
    if (id === "password") {
      $("#password").on("input", function () {
        if ($("#confirm").val() !== "") { validateField("confirm"); }
      });
    }
  });

  // Form submit
  $("#regForm").on("submit", function (e) {
    e.preventDefault();

    var allValid = true;
    $.each(rules, function (id) {
      if (!validateField(id)) { allValid = false; }
    });

    if (allValid) {
      $("#regForm").slideUp(300, function () {
        $("#successMsg").slideDown(350);
      });
    }
  });
});

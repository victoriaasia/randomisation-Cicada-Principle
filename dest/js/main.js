
var UserList = {

  init: function () {
    $.ajax({
      url: 'https://randomuser.me/api/?gender=female&results=60',
      dataType: 'json',
      success: function (data) {
        UserList.render(data);
      }
    });
  },

  render: function (data) {
    for (i = 0; i < data.results.length; i++) {
      var user = data.results[i];
      this.renderBlock(user);
    }
  },

  userTemplate: function () {
    return '<div class="user__item">' + '<div class="user__avatar">' + '<img src="{img}" alt="profile picture"/>' + '</div>' + '<div class="user__name">' + '<p class="user__name-last">{lastname}</p>' + '<p class="user__name-first">{firstname}</p>' + '</div>' + '</div>';
  },

  renderBlock: function (data) {
    var block = this.userTemplate();
    block = block.replace('{img}', data.picture.large);
    block = block.replace('{lastname}', data.name.last);
    block = block.replace('{firstname}', data.name.first);
    block = block.replace('{email}', data.email);
    $('.user').append(block);
  }
};

$(document).ready(function () {
  UserList.init();
});
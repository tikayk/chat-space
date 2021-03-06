$(function(){
  function buildHTML(message){
    let image = message.image? `<img class="input-box__image" src=${message.image}>` : "";
    let html = `<div class = 'message' data-message-id='${message.id}'>
                  <div class="message__upper-info">
                    <p class="message__upper-info__talker">
                      ${message.name}
                    </p>
                    <p class="message__upper-info__date">
                      ${message.date}
                    </p>
                  </div>
                  <div class="lower-message">
                    <p class="message__text">
                      ${message.content}
                    </p>
                    ${image}
                  </div>
                </div>`
    return html;
  }
  $('#new_message').on('submit',function(e){
    e.preventDefault()
    let formData = new FormData(this);
    let url = $(this).attr('action')
    $.ajax({
      url: url, 
      type: 'POST',
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight},'fast');
      $('.new_message')[0].reset('')
      $('.submit-btn').prop('disabled', false)
    })
    .fail(function() {
      alert("メッセージ送信に失敗");
    });
  })

  let reloadMessages = function(){
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      let last_message_id = $('.message:last').data('message-id');
      $.ajax({
        url: 'api/messages',
        type: 'GET',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages){
        let insertHTML = '';
        messages.forEach(function(message){
          insertHTML = buildHTML(message);
          $('.messages').append(insertHTML);
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        });
      })
      .fail(function(){
        console.log('error');
      })
    };
  };
  setInterval(reloadMessages,3000);
});
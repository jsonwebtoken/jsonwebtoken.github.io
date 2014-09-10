(function () {
  // Taken from http://stackoverflow.com/questions/2490825/how-to-trigger-event-in-javascript
  function fireEvent(element) {
    var event; // The custom event that will be created

    if (document.createEvent) {
      event = document.createEvent('HTMLEvents');
      event.initEvent('change', true, true);
    } else {
      event = document.createEventObject();
      event.eventType = 'change';
    }

    event.eventName = 'change';

    if (document.createEvent) {
      element.dispatchEvent(event);
    } else {
      element.fireEvent('on' + event.eventType, event);
    }
  }

  var codeMirror = CodeMirror;

  function tabHack(instance) {
    instance.replaceSelection('   ' , 'end');
  }

  var tokenEditor = $('.token-input');

  var xmlEditor = codeMirror(document.getElementsByClassName('xml-input')[0], {
    mode: 'text/html',
    // theme: 'night', 
    htmlMode: false,
    autofocus: true,
    extraKeys: { 'Tab': tabHack}
  });

  function saveToStorage(jwt) {
    // Save last valid jwt value for refresh
    localStorage.jwtValue = jwt;
  }

  function loadFromStorage(cb) {
    cb(localStorage.jwtValue);
    localStorage.clear();
  }

  function getTrimmedValue(value) {
    if (!value) {
      return null;
    }

    return value.replace(/\s/g, '');
  }


  tokenEditor.on('change keypress paste focus textInput input', function() {
    var decoded = window.decode(tokenEditor.val()).result;
    // $('.xml-input').val(decoded);
  });

  loadFromStorage(function (jwt) {
    tokenEditor.val(jwt || 'PHNhbWxwOlJlc3BvbnNlIHhtbG5zOnNhbWxwPSJ1cm46b2FzaXM6bmFtZXM6dGM6U0FNTDoyLjA6cHJvdG9jb2wiIElEPSJzMmEwZGEzNTA0YWZmOTc4YjBmOGM4MGY2YTYyYzcxM2M0YTJmNjRjNWIiIEluUmVzcG9uc2VUbz0iX2JlYzQyNGZhNTEwMzQyODkwOWEzMGZmMWUzMTE2ODMyN2Y3OTQ3NDk4NCIgVmVyc2lvbj0iMi4wIiBJc3N1ZUluc3RhbnQ9IjIwMDctMTItMTBUMTE6Mzk6NDhaIiBEZXN0aW5hdGlvbj0iaHR0cDovL21vb2RsZS5icmlkZ2UuZmVpZGUubm8vc2ltcGxlc2FtbC9zYW1sMi9zcC9Bc3NlcnRpb25Db25zdW1lclNlcnZpY2UucGhwIj4NCiAgICA8c2FtbDpJc3N1ZXIgeG1sbnM6c2FtbD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOmFzc2VydGlvbiI+DQogICAgICAgIG1heC5mZWlkZS5ubw0KICAgIDwvc2FtbDpJc3N1ZXI+DQogICAgPHNhbWxwOlN0YXR1cyB4bWxuczpzYW1scD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOnByb3RvY29sIj4NCiAgICAgICAgPHNhbWxwOlN0YXR1c0NvZGUgeG1sbnM6c2FtbHA9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDpwcm90b2NvbCIgVmFsdWU9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDpzdGF0dXM6U3VjY2VzcyI+DQogICAgICAgIDwvc2FtbHA6U3RhdHVzQ29kZT4NCiAgICA8L3NhbWxwOlN0YXR1cz4NCiAgICA8c2FtbDpBc3NlcnRpb24geG1sbnM6c2FtbD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOmFzc2VydGlvbiIgVmVyc2lvbj0iMi4wIiBJRD0iczJiN2FmZThlMjFhMDkxMGQwMjdkZmJjOTRlYzRiODYyZTFmYmJkOWFiIiBJc3N1ZUluc3RhbnQ9IjIwMDctMTItMTBUMTE6Mzk6NDhaIj4NCiAgICAgICAgPHNhbWw6SXNzdWVyPg0KICAgICAgICAgICAgbWF4LmZlaWRlLm5vDQogICAgICAgIDwvc2FtbDpJc3N1ZXI+DQogICAgICAgIDxTaWduYXR1cmUgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvMDkveG1sZHNpZyMiPg0KICAgICAgICAgICAgPFNpZ25lZEluZm8+DQogICAgICAgICAgICAgICAgPENhbm9uaWNhbGl6YXRpb25NZXRob2QgQWxnb3JpdGhtPSJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzEwL3htbC1leGMtYzE0biMiIC8+DQogICAgICAgICAgICAgICAgPFNpZ25hdHVyZU1ldGhvZCBBbGdvcml0aG09Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvMDkveG1sZHNpZyNyc2Etc2hhMSIgLz4NCiAgICAgICAgICAgICAgICA8UmVmZXJlbmNlIFVSST0iI3MyYjdhZmU4ZTIxYTA5MTBkMDI3ZGZiYzk0ZWM0Yjg2MmUxZmJiZDlhYiI+DQogICAgICAgICAgICAgICAgICAgIDxUcmFuc2Zvcm1zPg0KICAgICAgICAgICAgICAgICAgICAgICAgPFRyYW5zZm9ybSBBbGdvcml0aG09Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvMDkveG1sZHNpZyNlbnZlbG9wZWQtc2lnbmF0dXJlIiAvPg0KICAgICAgICAgICAgICAgICAgICAgICAgPFRyYW5zZm9ybSBBbGdvcml0aG09Imh0dHA6Ly93d3cudzMub3JnLzIwMDEvMTAveG1sLWV4Yy1jMTRuIyIgLz4NCiAgICAgICAgICAgICAgICAgICAgPC9UcmFuc2Zvcm1zPg0KICAgICAgICAgICAgICAgICAgICA8RGlnZXN0TWV0aG9kIEFsZ29yaXRobT0iaHR0cDovL3d3dy53My5vcmcvMjAwMC8wOS94bWxkc2lnI3NoYTEiIC8+DQogICAgICAgICAgICAgICAgICAgIDxEaWdlc3RWYWx1ZT4NCiAgICAgICAgICAgICAgICAgICAgICAgIGs3ei90M2lQS2l5WTlQN0I4N0ZJc014bmxuaz0NCiAgICAgICAgICAgICAgICAgICAgPC9EaWdlc3RWYWx1ZT4NCiAgICAgICAgICAgICAgICA8L1JlZmVyZW5jZT4NCiAgICAgICAgICAgIDwvU2lnbmVkSW5mbz4NCiAgICAgICAgICAgIDxTaWduYXR1cmVWYWx1ZT4NCiAgICAgICAgICAgICAgICBLdlVyekdjd0dzdThXTU5vZ0lSZkF4eFdsTzR1S1hoSnJvdU9ZYWFka3pVSHZ6MXhiVlVSSDM1c2k2VTgwODR1dE5BalhUalp5eGZqIHF1ckVYN1ZnQ3c2WG43RnhuNG5KeEQ2Rk9QNXgvaVJrOEtxQ3VmaXBSTkh3SUNxL1Z1ZnFQa3JQN3NWTGR5bUp5WjJDdTVRckVVMjMgcWFJempGZjg0S2ZwNExWbmxKWT0NCiAgICAgICAgICAgIDwvU2lnbmF0dXJlVmFsdWU+DQogICAgICAgICAgICA8S2V5SW5mbz4NCiAgICAgICAgICAgICAgICA8WDUwOURhdGE+DQogICAgICAgICAgICAgICAgICAgIDxYNTA5Q2VydGlmaWNhdGU+DQogICAgICAgICAgICAgICAgICAgICAgICBNSUlCL2pDQ0FXY0NCRWJ6ak5zd0RRWUpLb1pJaHZjTkFRRUZCUUF3UmpFTE1Ba0dBMVVFQmhNQ1RrOHhFREFPQmdOVkJBb1RCMVZPIFNVNUZWRlF4RGpBTUJnTlZCQXNUQlVabGFXUmxNUlV3RXdZRFZRUURFd3h0WVhndVptVnBaR1V1Ym04d0hoY05NRGN3T1RJeE1Ea3kgTURJM1doY05NRGN4TWpJd01Ea3lNREkzV2pCR01Rc3dDUVlEVlFRR0V3Sk9UekVRTUE0R0ExVUVDaE1IVlU1SlRrVlVWREVPTUF3RyBBMVVFQ3hNRlJtVnBaR1V4RlRBVEJnTlZCQU1UREcxaGVDNW1aV2xrWlM1dWJ6Q0JuekFOQmdrcWhraUc5dzBCQVFFRkFBT0JqUUF3IGdZa0NnWUVBdlpsQnpRMmpHTTZROVNUQko2dHF0dWdrT0JNRVUva3B2dndPbFQ2YzFYNVVJWE13QXBMK05WMkVhcWsrb0EwTitNNDIgSjdTeTBkTERxS1ZDd3NoN3Fwc0lZbERTL29teVVNZHk2QXp2cHRSVVVoTExoQzZ6UUZGQVUrNnJjVUtFaVNrRVI1ZXppQjRNM2FlMCBFa1cwZHJtMXJPWndiMjJ0cjhOSjY1cTNnbnNDQXdFQUFUQU5CZ2txaGtpRzl3MEJBUVVGQUFPQmdRQ21WU3RhOVRXaW4vd3Z2R09pIGU4Q3E3Y0VnME1KTGtCV0xvZk5OenJ6aDZoaVFnZnV6OUtNb20va2g5SnVHRWp5RTdySURiWHAyaWx4U0hnWlNhVmZFa3duTWZRNTEgdnVIVXJ0Um9sRC9za3lzSW9jbStISktic21QTWpTUmZVRnl6Qmg0Uk5qUG9Ddlp2VGRueUJmTVAvaS9IMzluakFkQlJpKzQ5YW9wYyB2dz09DQogICAgICAgICAgICAgICAgICAgIDwvWDUwOUNlcnRpZmljYXRlPg0KICAgICAgICAgICAgICAgIDwvWDUwOURhdGE+DQogICAgICAgICAgICA8L0tleUluZm8+DQogICAgICAgIDwvU2lnbmF0dXJlPg0KICAgICAgICA8c2FtbDpTdWJqZWN0Pg0KICAgICAgICAgICAgPHNhbWw6TmFtZUlEIE5hbWVRdWFsaWZpZXI9Im1heC5mZWlkZS5ubyIgU1BOYW1lUXVhbGlmaWVyPSJ1cm46bWFjZTpmZWlkZS5ubzpzZXJ2aWNlczpuby5mZWlkZS5tb29kbGUiIEZvcm1hdD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOm5hbWVpZC1mb3JtYXQ6cGVyc2lzdGVudCI+DQogICAgICAgICAgICAgICAgVUIvV0pBYUtBUHJTSGJxbGJjS1d1N0prdGNLWQ0KICAgICAgICAgICAgPC9zYW1sOk5hbWVJRD4NCiAgICAgICAgICAgIDxzYW1sOlN1YmplY3RDb25maXJtYXRpb24gTWV0aG9kPSJ1cm46b2FzaXM6bmFtZXM6dGM6U0FNTDoyLjA6Y206YmVhcmVyIj4NCiAgICAgICAgICAgICAgICA8c2FtbDpTdWJqZWN0Q29uZmlybWF0aW9uRGF0YSBOb3RPbk9yQWZ0ZXI9IjIwMDctMTItMTBUMTk6Mzk6NDhaIiBJblJlc3BvbnNlVG89Il9iZWM0MjRmYTUxMDM0Mjg5MDlhMzBmZjFlMzExNjgzMjdmNzk0NzQ5ODQiIFJlY2lwaWVudD0iaHR0cDovL21vb2RsZS5icmlkZ2UuZmVpZGUubm8vc2ltcGxlc2FtbC9zYW1sMi9zcC9Bc3NlcnRpb25Db25zdW1lclNlcnZpY2UucGhwIj4NCiAgICAgICAgICAgICAgICA8L3NhbWw6U3ViamVjdENvbmZpcm1hdGlvbkRhdGE+DQogICAgICAgICAgICA8L3NhbWw6U3ViamVjdENvbmZpcm1hdGlvbj4NCiAgICAgICAgPC9zYW1sOlN1YmplY3Q+DQogICAgICAgIDxzYW1sOkNvbmRpdGlvbnMgTm90QmVmb3JlPSIyMDA3LTEyLTEwVDExOjI5OjQ4WiIgTm90T25PckFmdGVyPSIyMDA3LTEyLTEwVDE5OjM5OjQ4WiI+DQogICAgICAgICAgICA8c2FtbDpBdWRpZW5jZVJlc3RyaWN0aW9uPg0KICAgICAgICAgICAgICAgIDxzYW1sOkF1ZGllbmNlPg0KICAgICAgICAgICAgICAgICAgICB1cm46bWFjZTpmZWlkZS5ubzpzZXJ2aWNlczpuby5mZWlkZS5tb29kbGUNCiAgICAgICAgICAgICAgICA8L3NhbWw6QXVkaWVuY2U+DQogICAgICAgICAgICA8L3NhbWw6QXVkaWVuY2VSZXN0cmljdGlvbj4NCiAgICAgICAgPC9zYW1sOkNvbmRpdGlvbnM+DQogICAgICAgIDxzYW1sOkF1dGhuU3RhdGVtZW50IEF1dGhuSW5zdGFudD0iMjAwNy0xMi0xMFQxMTozOTo0OFoiIFNlc3Npb25JbmRleD0iczI1OWZhZDljYWQwY2Y3ZDJiM2I2OGY0MmIxN2QwY2ZhNjY2OGUwMjAxIj4NCiAgICAgICAgICAgIDxzYW1sOkF1dGhuQ29udGV4dD4NCiAgICAgICAgICAgICAgICA8c2FtbDpBdXRobkNvbnRleHRDbGFzc1JlZj4NCiAgICAgICAgICAgICAgICAgICAgdXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOmFjOmNsYXNzZXM6UGFzc3dvcmQNCiAgICAgICAgICAgICAgICA8L3NhbWw6QXV0aG5Db250ZXh0Q2xhc3NSZWY+DQogICAgICAgICAgICA8L3NhbWw6QXV0aG5Db250ZXh0Pg0KICAgICAgICA8L3NhbWw6QXV0aG5TdGF0ZW1lbnQ+DQogICAgICAgIDxzYW1sOkF0dHJpYnV0ZVN0YXRlbWVudD4NCiAgICAgICAgICAgIDxzYW1sOkF0dHJpYnV0ZSBOYW1lPSJnaXZlbk5hbWUiPg0KICAgICAgICAgICAgICAgIDxzYW1sOkF0dHJpYnV0ZVZhbHVlIHhtbG5zOnNhbWw9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDphc3NlcnRpb24iPg0KICAgICAgICAgICAgICAgICAgICBSa1ZKUkVVZ1ZHVnpkQ0JWYzJWeUlDaG5hWFpsYms1aGJXVXBJTU80dzZiRHBjT1l3NGJEaFE9PQ0KICAgICAgICAgICAgICAgIDwvc2FtbDpBdHRyaWJ1dGVWYWx1ZT4NCiAgICAgICAgICAgIDwvc2FtbDpBdHRyaWJ1dGU+DQogICAgICAgICAgICA8c2FtbDpBdHRyaWJ1dGUgTmFtZT0iZWR1UGVyc29uUHJpbmNpcGFsTmFtZSI+DQogICAgICAgICAgICAgICAgPHNhbWw6QXR0cmlidXRlVmFsdWUgeG1sbnM6c2FtbD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOmFzc2VydGlvbiI+DQogICAgICAgICAgICAgICAgICAgIGRHVnpkRUJtWldsa1pTNXVidz09DQogICAgICAgICAgICAgICAgPC9zYW1sOkF0dHJpYnV0ZVZhbHVlPg0KICAgICAgICAgICAgPC9zYW1sOkF0dHJpYnV0ZT4NCiAgICAgICAgICAgIDxzYW1sOkF0dHJpYnV0ZSBOYW1lPSJvIj4NCiAgICAgICAgICAgICAgICA8c2FtbDpBdHRyaWJ1dGVWYWx1ZSB4bWxuczpzYW1sPSJ1cm46b2FzaXM6bmFtZXM6dGM6U0FNTDoyLjA6YXNzZXJ0aW9uIj4NCiAgICAgICAgICAgICAgICAgICAgVlU1SlRrVlVWQT09DQogICAgICAgICAgICAgICAgPC9zYW1sOkF0dHJpYnV0ZVZhbHVlPg0KICAgICAgICAgICAgPC9zYW1sOkF0dHJpYnV0ZT4NCiAgICAgICAgICAgIDxzYW1sOkF0dHJpYnV0ZSBOYW1lPSJvdSI+DQogICAgICAgICAgICAgICAgPHNhbWw6QXR0cmlidXRlVmFsdWUgeG1sbnM6c2FtbD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOmFzc2VydGlvbiI+DQogICAgICAgICAgICAgICAgICAgIFZVNUpUa1ZVVkE9PQ0KICAgICAgICAgICAgICAgIDwvc2FtbDpBdHRyaWJ1dGVWYWx1ZT4NCiAgICAgICAgICAgIDwvc2FtbDpBdHRyaWJ1dGU+DQogICAgICAgICAgICA8c2FtbDpBdHRyaWJ1dGUgTmFtZT0iZWR1UGVyc29uT3JnRE4iPg0KICAgICAgICAgICAgICAgIDxzYW1sOkF0dHJpYnV0ZVZhbHVlIHhtbG5zOnNhbWw9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDphc3NlcnRpb24iPg0KICAgICAgICAgICAgICAgICAgICBaR005ZFc1cGJtVjBkQ3hrWXoxdWJ3PT0NCiAgICAgICAgICAgICAgICA8L3NhbWw6QXR0cmlidXRlVmFsdWU+DQogICAgICAgICAgICA8L3NhbWw6QXR0cmlidXRlPg0KICAgICAgICAgICAgPHNhbWw6QXR0cmlidXRlIE5hbWU9ImVkdVBlcnNvblByaW1hcnlBZmZpbGlhdGlvbiI+DQogICAgICAgICAgICAgICAgPHNhbWw6QXR0cmlidXRlVmFsdWUgeG1sbnM6c2FtbD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOmFzc2VydGlvbiI+DQogICAgICAgICAgICAgICAgICAgIGMzUjFaR1Z1ZEE9PQ0KICAgICAgICAgICAgICAgIDwvc2FtbDpBdHRyaWJ1dGVWYWx1ZT4NCiAgICAgICAgICAgIDwvc2FtbDpBdHRyaWJ1dGU+DQogICAgICAgICAgICA8c2FtbDpBdHRyaWJ1dGUgTmFtZT0ibWFpbCI+DQogICAgICAgICAgICAgICAgPHNhbWw6QXR0cmlidXRlVmFsdWUgeG1sbnM6c2FtbD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOmFzc2VydGlvbiI+DQogICAgICAgICAgICAgICAgICAgIGJXOXlhV0V0YzNWd2NHOXlkRUIxYm1sdVpYUjBMbTV2DQogICAgICAgICAgICAgICAgPC9zYW1sOkF0dHJpYnV0ZVZhbHVlPg0KICAgICAgICAgICAgPC9zYW1sOkF0dHJpYnV0ZT4NCiAgICAgICAgICAgIDxzYW1sOkF0dHJpYnV0ZSBOYW1lPSJwcmVmZXJyZWRMYW5ndWFnZSI+DQogICAgICAgICAgICAgICAgPHNhbWw6QXR0cmlidXRlVmFsdWUgeG1sbnM6c2FtbD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOmFzc2VydGlvbiI+DQogICAgICAgICAgICAgICAgICAgIGJtOD0NCiAgICAgICAgICAgICAgICA8L3NhbWw6QXR0cmlidXRlVmFsdWU+DQogICAgICAgICAgICA8L3NhbWw6QXR0cmlidXRlPg0KICAgICAgICAgICAgPHNhbWw6QXR0cmlidXRlIE5hbWU9ImVkdVBlcnNvbk9yZ1VuaXRETiI+DQogICAgICAgICAgICAgICAgPHNhbWw6QXR0cmlidXRlVmFsdWUgeG1sbnM6c2FtbD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOmFzc2VydGlvbiI+DQogICAgICAgICAgICAgICAgICAgIGIzVTlkVzVwYm1WMGRDeHZkVDF2Y21kaGJtbDZZWFJwYjI0c1pHTTlkVzVwYm1WMGRDeGtZejF1Ync9PQ0KICAgICAgICAgICAgICAgIDwvc2FtbDpBdHRyaWJ1dGVWYWx1ZT4NCiAgICAgICAgICAgIDwvc2FtbDpBdHRyaWJ1dGU+DQogICAgICAgICAgICA8c2FtbDpBdHRyaWJ1dGUgTmFtZT0ic24iPg0KICAgICAgICAgICAgICAgIDxzYW1sOkF0dHJpYnV0ZVZhbHVlIHhtbG5zOnNhbWw9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDphc3NlcnRpb24iPg0KICAgICAgICAgICAgICAgICAgICBSa1ZKUkVVZ1ZHVnpkQ0JWYzJWeUlDaHpiaWtndzdqRHBzT2x3NWpEaHNPRg0KICAgICAgICAgICAgICAgIDwvc2FtbDpBdHRyaWJ1dGVWYWx1ZT4NCiAgICAgICAgICAgIDwvc2FtbDpBdHRyaWJ1dGU+DQogICAgICAgICAgICA8c2FtbDpBdHRyaWJ1dGUgTmFtZT0iY24iPg0KICAgICAgICAgICAgICAgIDxzYW1sOkF0dHJpYnV0ZVZhbHVlIHhtbG5zOnNhbWw9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDphc3NlcnRpb24iPg0KICAgICAgICAgICAgICAgICAgICBSa1ZKUkVVZ1ZHVnpkQ0JWYzJWeUlDaGpiaWtndzdqRHBzT2x3NWpEaHNPRg0KICAgICAgICAgICAgICAgIDwvc2FtbDpBdHRyaWJ1dGVWYWx1ZT4NCiAgICAgICAgICAgIDwvc2FtbDpBdHRyaWJ1dGU+DQogICAgICAgICAgICA8c2FtbDpBdHRyaWJ1dGUgTmFtZT0iZWR1UGVyc29uQWZmaWxpYXRpb24iPg0KICAgICAgICAgICAgICAgIDxzYW1sOkF0dHJpYnV0ZVZhbHVlIHhtbG5zOnNhbWw9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDphc3NlcnRpb24iPg0KICAgICAgICAgICAgICAgICAgICBaVzF3Ykc5NVpXVT1fYzNSaFptWT1fYzNSMVpHVnVkQT09DQogICAgICAgICAgICAgICAgPC9zYW1sOkF0dHJpYnV0ZVZhbHVlPg0KICAgICAgICAgICAgPC9zYW1sOkF0dHJpYnV0ZT4NCiAgICAgICAgPC9zYW1sOkF0dHJpYnV0ZVN0YXRlbWVudD4NCiAgICA8L3NhbWw6QXNzZXJ0aW9uPg0KPC9zYW1scDpSZXNwb25zZT4=');
  
    var decoded = window.decode(tokenEditor.val()).result;

        xmlEditor.setValue(decoded);
        console.log(xmlEditor);
    // $('.xml-input').val(decoded);
  });

}());


//TIMESTAMP
(function() {
  setInterval(function() {
    var now, timestamp;
    timestamp = new Date(1987, 5, 30);
    now = new Date();
    return $('#time').text(((now - timestamp) / 1000).toFixed(0));
  }, 1000);
}).call(this);

$(window).on('resize', function(){
  reinit();
});

//CANVAS
$(function(){
  var canvas = document.querySelector('canvas'),
      ctx = canvas.getContext('2d'),
      color = '#000000';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.display = 'block';
  ctx.fillStyle = color;
  ctx.lineWidth = .1;
  ctx.strokeStyle = color;

  var mousePosition = {
    x: 30 * canvas.width / 100,
    y: 30 * canvas.height / 100
  };

  var dots = {
    nb: 300,
    distance: 100,
    d_radius: 150,
    array: []
  };

  function Dot(){
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;

    this.vx = -.5 + Math.random();
    this.vy = -.5 + Math.random();

    this.radius = Math.random();
  }

  Dot.prototype = {
    create: function(){
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fill();
    },

    animate: function(){
      for(i = 0; i < dots.nb; i++){

        var dot = dots.array[i];

        if(dot.y < 0 || dot.y > canvas.height){
          dot.vx = dot.vx;
          dot.vy = - dot.vy;
        }
        else if(dot.x < 0 || dot.x > canvas.width){
          dot.vx = - dot.vx;
          dot.vy = dot.vy;
        }
        dot.x += dot.vx;
        dot.y += dot.vy;
      }
    },

    line: function(){
      for(i = 0; i < dots.nb; i++){
        for(j = 0; j < dots.nb; j++){
          i_dot = dots.array[i];
          j_dot = dots.array[j];

          if((i_dot.x - j_dot.x) < dots.distance && (i_dot.y - j_dot.y) < dots.distance && (i_dot.x - j_dot.x) > - dots.distance && (i_dot.y - j_dot.y) > - dots.distance){
            if((i_dot.x - mousePosition.x) < dots.d_radius && (i_dot.y - mousePosition.y) < dots.d_radius && (i_dot.x - mousePosition.x) > - dots.d_radius && (i_dot.y - mousePosition.y) > - dots.d_radius){
              ctx.beginPath();
              ctx.moveTo(i_dot.x, i_dot.y);
              ctx.lineTo(j_dot.x, j_dot.y);
              ctx.stroke();
              ctx.closePath();
            }
          }
        }
      }
    }
  };

  function createDots(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(i = 0; i < dots.nb; i++){
      dots.array.push(new Dot());
      dot = dots.array[i];

      dot.create();
    }

    dot.line();
    dot.animate();
  }

  $('canvas').on('mousemove mouseleave', function(e){
    if(e.type == 'mousemove'){
      mousePosition.x = e.pageX;
      mousePosition.y = e.pageY;
    }
    if(e.type == 'mouseleave'){
      mousePosition.x = canvas.width / 2;
      mousePosition.y = canvas.height / 2;
    }
  });
  setInterval(createDots, 1000/30); 
});

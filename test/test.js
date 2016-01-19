// var es_claims = '{"email": "user@example.com"}';
var es_data = {
  ES256: [
    {
      private:  '-----BEGIN PRIVATE KEY-----\nMIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQg/r+PWvFfFWaHlbkD\n9oru0gtE5fbCK3xF17g/g7fRJmehRANCAATXv2ixqW5Kt3iU7N5BPjw2jXqxzyEU\nErsVE6ciAeapw07gz7t6E7Umm/C8yCmiVq31iHATdsGgKp4vxX/Oqzyv\n-----END PRIVATE KEY-----\n' ,
      public:   '-----BEGIN PUBLIC KEY-----\nMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE179osaluSrd4lOzeQT48No16sc8h\nFBK7FROnIgHmqcNO4M+7ehO1JpvwvMgpolat9YhwE3bBoCqeL8V/zqs8rw==\n-----END PUBLIC KEY-----\n' ,
      jwt:      'eyJ0eXAiOiAiSldUIiwgImFsZyI6ICJFUzI1NiJ9.eyJlbWFpbCI6ICJ1c2VyQGV4YW1wbGUuY29tIn0._Ppg9fQ9qpiWaWPemhzfwnM_CmOEZK26-sbt4VN83dZUuzaekWjI4eCTUIl_Wwtqa0WZKZIQK7wUwK5qPWZIJQ'
    },
    {
      private:  '-----BEGIN PRIVATE KEY-----\nMIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgnVKtJAXCz/rV3tX2\nsVXeeEiDV0uepJ8FgVD3gT8KfAihRANCAARsu7dB+ElV9AqmSjDep8hJvdpDM6YC\nVIwNqpr9kEz2/PY0lDtLUgeTiGML2xgzG4Hi+3wX/wNgeTMKmOz1XxkM\n-----END PRIVATE KEY-----\n' ,
      public:   '-----BEGIN PUBLIC KEY-----\nMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEbLu3QfhJVfQKpkow3qfISb3aQzOm\nAlSMDaqa/ZBM9vz2NJQ7S1IHk4hjC9sYMxuB4vt8F/8DYHkzCpjs9V8ZDA==\n-----END PUBLIC KEY-----\n' ,
      jwt:      'eyJ0eXAiOiAiSldUIiwgImFsZyI6ICJFUzI1NiJ9.eyJlbWFpbCI6ICJ1c2VyQGV4YW1wbGUuY29tIn0.zR_aKp3mMlaglUwFPAuBKVn61qNhnRm-HAvuE0YFYlvriwA-bwfywUPh0gHaOn8pNKIisTk6tFuIYlnzu5xQ1A'
    },
    {
      private:  '-----BEGIN PRIVATE KEY-----\nMIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQg/R45SeshMml0d1GY\nv+PvzPANao2TIIl9zj+NLT7GKw+hRANCAAR5qzXiP8QBMn2qzjAHFyB7VLL+eQpc\n5R1kF6zrnbFLnKBPez3zhdYXqrh4gydqHCskaG6wB1YzodrxxnhM46aO\n-----END PRIVATE KEY-----\n' ,
      public:   '-----BEGIN PUBLIC KEY-----\nMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEeas14j/EATJ9qs4wBxcge1Sy/nkK\nXOUdZBes652xS5ygT3s984XWF6q4eIMnahwrJGhusAdWM6Ha8cZ4TOOmjg==\n-----END PUBLIC KEY-----\n' ,
      jwt:      'eyJ0eXAiOiAiSldUIiwgImFsZyI6ICJFUzI1NiJ9.eyJlbWFpbCI6ICJ1c2VyQGV4YW1wbGUuY29tIn0.lWobsdaRLebZwYhIL5DLoiUL710QPjVvvwqM6-OxL4Mh-NNBnd-HPEbP-JR2xM7DTrp-qyF8PswlwsPhiXjbNA'
    },
    {
      private:  '-----BEGIN PRIVATE KEY-----\nMIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgmSLI8iZFQJsbCGoX\nKkrLkVbQr61VKQ9tJNtwCYpGQy2hRANCAARZSqh9Va+ASkdVPw0Tw/JD7r37WX3l\nP5cD6Wf41BNUWqTLKjM8WMCK9G3jscsJouB2pjyN4FjWnzIdkiSM+e54\n-----END PRIVATE KEY-----\n' ,
      public:   '-----BEGIN PUBLIC KEY-----\nMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEWUqofVWvgEpHVT8NE8PyQ+69+1l9\n5T+XA+ln+NQTVFqkyyozPFjAivRt47HLCaLgdqY8jeBY1p8yHZIkjPnueA==\n-----END PUBLIC KEY-----\n' ,
      jwt:      'eyJ0eXAiOiAiSldUIiwgImFsZyI6ICJFUzI1NiJ9.eyJlbWFpbCI6ICJ1c2VyQGV4YW1wbGUuY29tIn0.tlMvMkgoaSqfKeilE3oV8zEd3KVNb3SZijAd4qlflKb2ulXty_W8ATfJ7tDtWarmEcDC2IY4ta6sTreQL13Z-w'
    },
    {
      private:  '-----BEGIN PRIVATE KEY-----\nMIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQg/qaTkajw1KO3f95g\nnowiCXyWXbzPIvpEtvpwpyXMii6hRANCAASx9jtsc+OeHmi04DwhIXH3qja8nDqN\nI3qZ2L3qWAKcQ9GoeubBtJ53nAGNnhc/xKwdv4RjBd1pW3jA5xHq3784\n-----END PRIVATE KEY-----\n' ,
      public:   '-----BEGIN PUBLIC KEY-----\nMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEsfY7bHPjnh5otOA8ISFx96o2vJw6\njSN6mdi96lgCnEPRqHrmwbSed5wBjZ4XP8SsHb+EYwXdaVt4wOcR6t+/OA==\n-----END PUBLIC KEY-----\n' ,
      jwt:      'eyJ0eXAiOiAiSldUIiwgImFsZyI6ICJFUzI1NiJ9.eyJlbWFpbCI6ICJ1c2VyQGV4YW1wbGUuY29tIn0.qD58QRo_JI3OVFC-D95fomvryZilyzIT_8woTYEbB8vsnLpFMCKNTxate-T_un4j032XvHgTZef95pyEzgk8eQ'
    }
  ],
  ES384: [
    {
      private:  '-----BEGIN PRIVATE KEY-----\nMIG2AgEAMBAGByqGSM49AgEGBSuBBAAiBIGeMIGbAgEBBDDQlK+vly612xrxy7Vd\nLAiUcePHdqVGdnr8d9BW8jhU9zOGKFmo+0pnmIDq+KNONVChZANiAASpbn4wCoT+\niuEOxSAQyc3oKruRIx+vcwI3myBY0JPSpMgLAezBwIzctaEKCXdmaI5EM8TSFlyI\n9UkYBBWA1YJpgCjvGV4n2s2IpLBc1FjEOP+lMEJ4J9o1aK7z3Ly9wTY=\n-----END PRIVATE KEY-----\n' ,
      public:   '-----BEGIN PUBLIC KEY-----\nMHYwEAYHKoZIzj0CAQYFK4EEACIDYgAEqW5+MAqE/orhDsUgEMnN6Cq7kSMfr3MC\nN5sgWNCT0qTICwHswcCM3LWhCgl3ZmiORDPE0hZciPVJGAQVgNWCaYAo7xleJ9rN\niKSwXNRYxDj/pTBCeCfaNWiu89y8vcE2\n-----END PUBLIC KEY-----\n' ,
      jwt:      'eyJhbGciOiAiRVMzODQiLCAidHlwIjogIkpXVCJ9.eyJlbWFpbCI6ICJ1c2VyQGV4YW1wbGUuY29tIn0.F4PMlX3R-SPpcDOWw6IHtY484LqV8FF2pgmAd1XulVoqRULGCmbIvNYTzvEtl2KWsK_yWaOJMjjz7Tm31oRrK-5Wa9beAudp57F_gOKArw1mSO0XowwI1Ig5qOJdgBVG'
    },
    {
      private:  '-----BEGIN PRIVATE KEY-----\nMIG2AgEAMBAGByqGSM49AgEGBSuBBAAiBIGeMIGbAgEBBDD4C0Irqv1Lr6zcsewz\nt0G0q2bg5doDtcUDuFYpdbrPJzlqWLAUIpohiuMMW5URFV6hZANiAAR028NPuNCk\nWMHiNuOWAo+dMqTHNjvdgMtmYNcw7dNMwVgH38m7rCIl5XzYQ9C2L9caWdv0V5mS\nthBRD8cBAX3bDrtvBR5njPqoLMKgL3iaWeqQ0fX8VerazY8tPVYqz8Q=\n-----END PRIVATE KEY-----\n' ,
      public:   '-----BEGIN PUBLIC KEY-----\nMHYwEAYHKoZIzj0CAQYFK4EEACIDYgAEdNvDT7jQpFjB4jbjlgKPnTKkxzY73YDL\nZmDXMO3TTMFYB9/Ju6wiJeV82EPQti/XGlnb9FeZkrYQUQ/HAQF92w67bwUeZ4z6\nqCzCoC94mlnqkNH1/FXq2s2PLT1WKs/E\n-----END PUBLIC KEY-----\n' ,
      jwt:      'eyJhbGciOiAiRVMzODQiLCAidHlwIjogIkpXVCJ9.eyJlbWFpbCI6ICJ1c2VyQGV4YW1wbGUuY29tIn0.tjlGQBsWSRvKzeF40jxrMu-8VAollZFTTYac64Koor7-pMllehZpsOc2l0mKq7DiThD-qxej7SN_Jw0sBaPOL56VdEbh2-XD2ciz-eKcuSbetcQ4zsi6c2RxBBwUCbJ_'
    },
    {
      private:  '-----BEGIN PRIVATE KEY-----\nMIG2AgEAMBAGByqGSM49AgEGBSuBBAAiBIGeMIGbAgEBBDBp4xrPkDKQAJ5meqLw\nkCsMnV1hb8hYHNw1BBfI1/oOdeP3Hfyj7XISnJgQD0fCTKyhZANiAAQoBZBeeY47\nqCp+y7AJeepHmrP+muH1hUZUxxGHYfTgbqz8Cj9wWvLs7KdJDxRWh45MAYNwSQZi\nJtqOzHzuG58MzAJ8BoH/BBYkkz6gBFuCZL+jjT93pTCAVYeVqStzl60=\n-----END PRIVATE KEY-----\n' ,
      public:   '-----BEGIN PUBLIC KEY-----\nMHYwEAYHKoZIzj0CAQYFK4EEACIDYgAEKAWQXnmOO6gqfsuwCXnqR5qz/prh9YVG\nVMcRh2H04G6s/Ao/cFry7OynSQ8UVoeOTAGDcEkGYibajsx87hufDMwCfAaB/wQW\nJJM+oARbgmS/o40/d6UwgFWHlakrc5et\n-----END PUBLIC KEY-----\n' ,
      jwt:      'eyJhbGciOiAiRVMzODQiLCAidHlwIjogIkpXVCJ9.eyJlbWFpbCI6ICJ1c2VyQGV4YW1wbGUuY29tIn0.7J3H3-mI7Mk8Q_noJnoX4CBhD09pNk93wo6cwAOCqqPNphaEKLLt-L36W9PNA4iNzQ-K8CTw7K_iIIm2y-tPuVQnGoYhiBb08A7QaZeHT9si_SLixGqUZOcMqbb7tvkL'
    },
    {
      private:  '-----BEGIN PRIVATE KEY-----\nMIG2AgEAMBAGByqGSM49AgEGBSuBBAAiBIGeMIGbAgEBBDCOxYOGS536Lhjyk1xt\n0Wzat/nKcXrX5Ju4W6o6Vx19mNhWS4GnEE35FBEnbCkTDYChZANiAARA/lNuxHlh\nk1caHu13+n/M5pJl1VRI9kLHYMGZHmWqtb8JiAS+lYSqv/2fLZovzSWEBEhMxk+8\nnDwJs5ISh9Yv7w0X8id3HmMgnZapDV3l6NxwBzR4GYnnAR+AVsO9yt0=\n-----END PRIVATE KEY-----\n' ,
      public:   '-----BEGIN PUBLIC KEY-----\nMHYwEAYHKoZIzj0CAQYFK4EEACIDYgAEQP5TbsR5YZNXGh7td/p/zOaSZdVUSPZC\nx2DBmR5lqrW/CYgEvpWEqr/9ny2aL80lhARITMZPvJw8CbOSEofWL+8NF/Indx5j\nIJ2WqQ1d5ejccAc0eBmJ5wEfgFbDvcrd\n-----END PUBLIC KEY-----\n' ,
      jwt:      'eyJhbGciOiAiRVMzODQiLCAidHlwIjogIkpXVCJ9.eyJlbWFpbCI6ICJ1c2VyQGV4YW1wbGUuY29tIn0.JjteOFMlrib6wilmYJqnjI4XveT2sPePa6xCN4ayHul1Nk6eHK0MrZpQwdNIMQvGA4GlvE1B0fwLIeWJXCuppQQYQjHRPt9gMAmcR_iPWQ2mSTM3Y2cmxjRzj_JlUpT9'
    },
    {
      private:  '-----BEGIN PRIVATE KEY-----\nMIG2AgEAMBAGByqGSM49AgEGBSuBBAAiBIGeMIGbAgEBBDDw6m4c6MknKRAvMUWA\nof6qTTbW4+ejcrp3uhfLwrXXH0nyZyNv0370NrWAcFLSGnihZANiAAQxzfaSUeRp\n1CzWc2USwJE+WMwW4vG5NccnzPF7y9hN6Fz8xB5Et9f6KUh5cjWEL/jLtjfA/wdM\nl2S9LqrQTxU7JY6yp1C7zggnSxH2DbV26DTACHwx60sE86FF9uITX6w=\n-----END PRIVATE KEY-----\n' ,
      public:   '-----BEGIN PUBLIC KEY-----\nMHYwEAYHKoZIzj0CAQYFK4EEACIDYgAEMc32klHkadQs1nNlEsCRPljMFuLxuTXH\nJ8zxe8vYTehc/MQeRLfX+ilIeXI1hC/4y7Y3wP8HTJdkvS6q0E8VOyWOsqdQu84I\nJ0sR9g21dug0wAh8MetLBPOhRfbiE1+s\n-----END PUBLIC KEY-----\n' ,
      jwt:      'eyJhbGciOiAiRVMzODQiLCAidHlwIjogIkpXVCJ9.eyJlbWFpbCI6ICJ1c2VyQGV4YW1wbGUuY29tIn0.J0C0ezxX7LOdMQ7v311WVNJ4jqnMxC0TASrMR8rGqpdFUt3rglCrr0jxh6cYGwrYYEbycDUHqQfv9d0ckUIkb5X6QJYq6P72Hmn6BDJtMGJne3uYnistr5xY05sNZJB3'
    }
  ],
  // ES521: [
  //   {
  //     private:  '-----BEGIN PRIVATE KEY-----\nMIHuAgEAMBAGByqGSM49AgEGBSuBBAAjBIHWMIHTAgEBBEIBJuMDtu2gGfBL5pHq\nSHPlZi9M7HV/mNdspn70bhH+AbVkbWcwq2WUj0LroW08YRPeifMKhQgu6YTdjHGX\nv0QSHUihgYkDgYYABACHx45IZsfyy2WDWKgQvfWybivQSruZMCYaxK628/5vKEM0\n96YGCwPLeLWizHqeIBpgUGD/Xn2fwn9WOfb38DyTMQB+4lz1pUKFBl7ZuSCbbD96\n24MEGrZnGUUo/tqmMqct8DafffdEC/Ag46uTDwDKWsM79ZoDQUA26iEAqL2Uv4gi\nKQ==\n-----END PRIVATE KEY-----\n' ,
  //     public:   '-----BEGIN PUBLIC KEY-----\nMIGbMBAGByqGSM49AgEGBSuBBAAjA4GGAAQAh8eOSGbH8stlg1ioEL31sm4r0Eq7\nmTAmGsSutvP+byhDNPemBgsDy3i1osx6niAaYFBg/159n8J/Vjn29/A8kzEAfuJc\n9aVChQZe2bkgm2w/etuDBBq2ZxlFKP7apjKnLfA2n333RAvwIOOrkw8AylrDO/Wa\nA0FANuohAKi9lL+IIik=\n-----END PUBLIC KEY-----\n' ,
  //     jwt:      'eyJhbGciOiAiRVM1MjEiLCAidHlwIjogIkpXVCJ9.eyJlbWFpbCI6ICJ1c2VyQGV4YW1wbGUuY29tIn0.AC-o_eph0zaFaKC6ZEsTKgikEzkWAHeS15ZeriIYEeGyvCkcXiiAkQJxAQ-K7Ya_X7ih-GEsOA0qKHRmvX-jVNfYAU4k5xeBZmsBMEZl6DZw3ACRt-G-MKP18o4gfcbTy-LPSQzCoo8NfVhOWiZ3UjyprzwSqGaJK5rjF6UA5MK2VXz5'
  //   },
  //   {
  //     private:  '-----BEGIN PRIVATE KEY-----\nMIHuAgEAMBAGByqGSM49AgEGBSuBBAAjBIHWMIHTAgEBBEIAINmLfr8jPYDsOhpr\nxF2OV2xjg7kx23EFSd5NCKt732CJ8awv8XuXcGEKaULlbK1wLu2/y1fmTE96lmkt\nirby2oihgYkDgYYABABnAOS+W2g757bmch3dkivXffYvwkFnknz5wOiWRIl9MgEk\nAmFqUkCyjz0+x/iKmy7PPwxFKJ9p97IhSOcbWN0mYQH5y8PM0e2E/NSMg+6SffOM\n1y2sEdz7YrrBsnz2gxIevF8/js7q7hXtAquYD+mKbnKbkXJeA+tQWx5dCann1Tci\nLw==\n-----END PRIVATE KEY-----\n' ,
  //     public:   '-----BEGIN PUBLIC KEY-----\nMIGbMBAGByqGSM49AgEGBSuBBAAjA4GGAAQAZwDkvltoO+e25nId3ZIr1332L8JB\nZ5J8+cDolkSJfTIBJAJhalJAso89Psf4ipsuzz8MRSifafeyIUjnG1jdJmEB+cvD\nzNHthPzUjIPukn3zjNctrBHc+2K6wbJ89oMSHrxfP47O6u4V7QKrmA/pim5ym5Fy\nXgPrUFseXQmp59U3Ii8=\n-----END PUBLIC KEY-----\n' ,
  //     jwt:      'eyJhbGciOiAiRVM1MjEiLCAidHlwIjogIkpXVCJ9.eyJlbWFpbCI6ICJ1c2VyQGV4YW1wbGUuY29tIn0.AcbYFJqbHsT9j8Y88VEP21JWdRQevuH2fBHDE8xJSYuGswQIotVqTutSNtmoUJ2x-dpGai8qarEZBUoMcIr8Q4qGAcnbIBFuUZ9GJHDlTJDH3KYycCSaTaEl6W4z3jMdJS49QC010YyNcBFiyC6RprEY_KRhp04HyP20HxST20OeaDG5'
  //   },
  //   {
  //     private:  '-----BEGIN PRIVATE KEY-----\nMIHuAgEAMBAGByqGSM49AgEGBSuBBAAjBIHWMIHTAgEBBEIB3sFMV2GZuWURGTix\n7LkbEWuvU4AOYjOLZ7TGVejGOF8k9AILhfutuz4RMjcFTgCbxchw1p/JGkDSJ7BQ\n+rZIDayhgYkDgYYABAHmg5S9iOSR3rD0nZJZImClw0VqPvXICHOyWCcVxV8xHQPW\nLq2opQ8ySdLmauZVlP5Cdv7/dT0uH6HjTiTm3KQ50QEOIKJ+AdpOhgNWtH2w6xCF\njGG9KMPF/WIXAOn+c0ZP8O9V9LMieoBQW5TmFAHQuAPnf/xAa/lR9lnjHTim0fu8\nzQ==\n-----END PRIVATE KEY-----\n' ,
  //     public:   '-----BEGIN PUBLIC KEY-----\nMIGbMBAGByqGSM49AgEGBSuBBAAjA4GGAAQB5oOUvYjkkd6w9J2SWSJgpcNFaj71\nyAhzslgnFcVfMR0D1i6tqKUPMknS5mrmVZT+Qnb+/3U9Lh+h404k5tykOdEBDiCi\nfgHaToYDVrR9sOsQhYxhvSjDxf1iFwDp/nNGT/DvVfSzInqAUFuU5hQB0LgD53/8\nQGv5UfZZ4x04ptH7vM0=\n-----END PUBLIC KEY-----\n' ,
  //     jwt:      'eyJhbGciOiAiRVM1MjEiLCAidHlwIjogIkpXVCJ9.eyJlbWFpbCI6ICJ1c2VyQGV4YW1wbGUuY29tIn0.AED1MQstn9pYEGspauv7wrLotjSGw_684uwCepeQ8TsOFru3vcZWQQ8BLoq5vPvt9SokeOOTgf9oc2yuBNFq8JuOASU5AS3e5nqcSUfq0cbya2P9TW9p-PrqLQ6Qa5jaVs9EsMu5CGz5ElubEAt8NLlrg45iRznJjs_9gqRMqDTwl9A9'
  //   },
  //   {
  //     private:  '-----BEGIN PRIVATE KEY-----\nMIHuAgEAMBAGByqGSM49AgEGBSuBBAAjBIHWMIHTAgEBBEIAQwS+wmiMZUk/FrZP\n0UeqSLK5PoDuziUEVlE9mimBObvrVdNL6ULtRekqs6oEz24V1xz3/qp2LSKyYxNm\n2ASSbzqhgYkDgYYABADOjL6ZRTpBJeBIPKN87THg7dCpP53FG08WBPrsNYkpJB/2\n15GWJYZVCyoqNAmwk6D+TDzm1vLumBPS2gTl9dMj/wH0srDqCk3Se/PtRpPEE1OH\nDEPP9/5z3mi9tlVJ63ig+nYSv2V/UbA9BCuMJU1R9BnCk2sJ/shJaT8h/q6gg8av\nbA==\n-----END PRIVATE KEY-----\n' ,
  //     public:   '-----BEGIN PUBLIC KEY-----\nMIGbMBAGByqGSM49AgEGBSuBBAAjA4GGAAQAzoy+mUU6QSXgSDyjfO0x4O3QqT+d\nxRtPFgT67DWJKSQf9teRliWGVQsqKjQJsJOg/kw85tby7pgT0toE5fXTI/8B9LKw\n6gpN0nvz7UaTxBNThwxDz/f+c95ovbZVSet4oPp2Er9lf1GwPQQrjCVNUfQZwpNr\nCf7ISWk/If6uoIPGr2w=\n-----END PUBLIC KEY-----\n' ,
  //     jwt:      'eyJhbGciOiAiRVM1MjEiLCAidHlwIjogIkpXVCJ9.eyJlbWFpbCI6ICJ1c2VyQGV4YW1wbGUuY29tIn0.APb38dXUl2i1n45iUh5mbUohCxtEagoAc8Y2UE5gqrrfaMdwQa0MG2HZRUCtpHzxbuubGFR2ZNBlPsDrMmpBWH-fAWl0KPLdWd1E6les7Oy6OUDq4h-m_aOCOT78cw-5-po70qazJigecl9yNvpgHff6Ka8I6euVlE0G1QJle0Cxv3cp'
  //   },
  //   {
  //     private:  '-----BEGIN PRIVATE KEY-----\nMIHuAgEAMBAGByqGSM49AgEGBSuBBAAjBIHWMIHTAgEBBEIB/LFWM/Oa7CaunRJB\nppj/olkNF9f+gZFrhix08GcuD/5DNCtM0BQ88QoMCDIWabjtUIog7hay4KYC/wAn\nHhpMXQqhgYkDgYYABADnIlhERVi08M4yIUdqaioO6ICFA70AHOl0caaScA5QHQTm\nqVinsbQMqqQ4KzHtdIvGzJKHSFGbOHmgjZOmc8AwiwEjFCSz/uAS5wRNG5meRNM0\nZAMoCPJTitnEoXHwp5Tz3mMHLuxcWZ7X5jbMEbNXFoV0G6cqsrsVLYf8LiMSgTXE\n1g==\n-----END PRIVATE KEY-----\n' ,
  //     public:   '-----BEGIN PUBLIC KEY-----\nMIGbMBAGByqGSM49AgEGBSuBBAAjA4GGAAQA5yJYREVYtPDOMiFHamoqDuiAhQO9\nABzpdHGmknAOUB0E5qlYp7G0DKqkOCsx7XSLxsySh0hRmzh5oI2TpnPAMIsBIxQk\ns/7gEucETRuZnkTTNGQDKAjyU4rZxKFx8KeU895jBy7sXFme1+Y2zBGzVxaFdBun\nKrK7FS2H/C4jEoE1xNY=\n-----END PUBLIC KEY-----\n' ,
  //     jwt:      'eyJhbGciOiAiRVM1MjEiLCAidHlwIjogIkpXVCJ9.eyJlbWFpbCI6ICJ1c2VyQGV4YW1wbGUuY29tIn0.AT_37DlTF3pYOn-ODhtRYTKafRFs1cMNhumcnPE5j2SCMvUjBA_EUhOeJ-TZc0-Vh3HiDVnTn1tIThCfsNYqmpncAXzrGUR81zG-uWsK3SpSV6NMvyuW5ullfH98InYeQVOrHHNfviO_euZp9P7pSAwWheUIZEUfIRWXfs4COd_G2OzF'
  //   }
  // ]
};

describe('jwt library wrapper (jwt.js)', function () {
  // TODO Add RS256 tests
  it('should fail on invalid data', function () {
    var result = window.verify('hello', 'bye', false);
    expect(result.error).not.to.be(null);
    expect(result.result).to.be('');
  });
  it('should verify using ascii secret', function () {
    var result = window.verify('HS256', 'eyJhbGciOiJIUzI1NiIsImN0eSI6IkpXVCJ9.eyJhZ2UiOjIxfQ.8nqb61Mdqdama9pZQz07HiIySY6FZC9UjHMKHg6zhjw', 'secret', false);
    expect(result.error).to.be.equal(null);
    expect(result.result).to.be(true);
  });
  it('should verify using bas64 encoded secret', function () {
    var jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2F1dGgwLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1MjdhYzIxOWQ1ZWFjYzE4ZDQwMDAwMDUiLCJhdWQiOiJhRkd2RFRvNTVHT3RkRVlyb1Fsa3RBMkFHNU1rVDY2SCIsImV4cCI6MTM5NDY5OTg5MiwiaWF0IjoxMzk0NjYzODkyfQ.kEdt5CChBWdPytkGv10mb3tqe6CEcpCQ_DLnEgq69p8';
    var secret = '3GdpH_8Ty1Sx_laCRwyUaSl7ddb6xfpR-352SZPFdPKdZ1S8KGtDYbiNMG3Wt61X';
    var result = window.verify('HS256', jwt, secret, true);
    expect(result.error).to.be.equal(null);
    expect(result.result).to.be(true);
  });
  it('should decode with two underscores', function () {
    var result = window.decode('eyI_IjoiYWE_In0');
    expect(result.error).to.be.equal(null);
    expect(result.result).to.be('{\n  "?": "aa?"\n}');
  });
  describe('ECDSA functions', function() {
    function es_verify_alg(alg) {
      describe(alg, function() {
        es_data[alg].map(function(data, index) {
          it ('should verify ' + alg + ' [' + index + ']', function() {
            // console.log(alg, data.jwt);
            var result = window.verify(alg, data.jwt, data.public, true);
            expect(result.error).to.be.equal(null);
            expect(result.result).to.be(true);
          });
        });
      });
    }

    for (var alg in es_data) {
      es_verify_alg(alg);
    }
  });
});

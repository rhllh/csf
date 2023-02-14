package com.vttp2022.day39ws.server.service;

import java.io.StringReader;
import java.security.MessageDigest;
import java.util.HexFormat;
import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.vttp2022.day39ws.server.model.MarvelCharacter;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;

@Service
public class MarvelService {
    
    // inject into service the private and public key
    @Value("${MARVEL_PUBLIC_KEY}")
    private String publicKey;

    @Value("${MARVEL_PRIVATE_KEY}")
    private String privateKey;

    private static final String GET_ALL_CHAR_URL = "https://gateway.marvel.com:443/v1/public/characters";
    private static final String GET_ONE_CHAR_URL = "https://gateway.marvel.com:443/v1/public/characters/";

    public List<MarvelCharacter> searchCharByStartWith(String keyword, int offset) {

        Long ts = System.currentTimeMillis();
        String signature = "%d%s%s".formatted(ts, privateKey, publicKey);
        String hash = "";

        // message digest = md5, sha1, sha512
        try {
            // get an instance of MD5
            MessageDigest md5 = MessageDigest.getInstance("MD5");

            // update message digest
            md5.update(signature.getBytes());

            // calculate hash
            byte[] h = md5.digest();

            // stringify mds digest
            hash = HexFormat.of().formatHex(h);
        } catch (Exception e) {
            e.printStackTrace();
        }

        /*
         * https://gateway.marvel.com:443/v1/public/characters
         * ?nameStartsWith=<keyword>
         * &limit=10
         * &offset=<offset>
         * &ts=<timestamp>
         * &apikey=<publicKey>
         * &hash=<hash>
         */
        String searchUrl = UriComponentsBuilder.fromUriString(GET_ALL_CHAR_URL)
            .queryParam("nameStartsWith", keyword)
            .queryParam("limit", 5)
            .queryParam("offset", offset)
            .queryParam("ts", ts)
            .queryParam("apikey", publicKey)
            .queryParam("hash", hash)
            .toUriString();

        System.out.println("url > " + searchUrl);

        RequestEntity<Void> req = RequestEntity.get(searchUrl).accept(MediaType.APPLICATION_JSON).build();
        RestTemplate template = new RestTemplate();
        ResponseEntity<String> resp = template.exchange(req, String.class);
        String payload = resp.getBody();
        
        JsonReader reader = Json.createReader(new StringReader(payload));
        JsonObject result = reader.readObject();
        JsonArray data = result.getJsonObject("data").getJsonArray("results");

        List<MarvelCharacter> cList = new LinkedList<>();
        for (Integer i = 0; i < data.size(); i++) {
            cList.add(MarvelCharacter.create(data.getJsonObject(i)));
        }

        return cList;
    }

    public MarvelCharacter getOneCharById(String id) {

        // System.out.println(id);

        Long ts = System.currentTimeMillis();
        String signature = "%d%s%s".formatted(ts, privateKey, publicKey);
        String hash = "";

        // message digest = md5, sha1, sha512
        try {
            // get an instance of MD5
            MessageDigest md5 = MessageDigest.getInstance("MD5");

            // update message digest
            md5.update(signature.getBytes());

            // calculate hash
            byte[] h = md5.digest();

            // stringify mds digest
            hash = HexFormat.of().formatHex(h);
        } catch (Exception e) {
            e.printStackTrace();
        }

        /*
         * https://gateway.marvel.com:443/v1/public/characters/<id>
         * &ts=<timestamp>
         * &apikey=<publicKey>
         * &hash=<hash>
         */
        String searchUrl = UriComponentsBuilder.fromUriString(GET_ONE_CHAR_URL)
            .path(id)
            .queryParam("ts", ts)
            .queryParam("apikey", publicKey)
            .queryParam("hash", hash)
            .toUriString();

        if (searchUrl.contains("%7D")) {
            searchUrl = searchUrl.replace("%7D", "");
        }
        System.out.println("url > " + searchUrl);

        RequestEntity<Void> req = RequestEntity.get(searchUrl).accept(MediaType.APPLICATION_JSON).build();
        RestTemplate template = new RestTemplate();
        ResponseEntity<String> resp = template.exchange(req, String.class);
        String payload = resp.getBody();
        
        JsonReader reader = Json.createReader(new StringReader(payload));
        JsonObject result = reader.readObject();
        JsonArray data = result.getJsonObject("data").getJsonArray("results");

        // System.out.println(data.getJsonObject(0));
        MarvelCharacter c = MarvelCharacter.create(data.getJsonObject(0));

        return c;

    }

}

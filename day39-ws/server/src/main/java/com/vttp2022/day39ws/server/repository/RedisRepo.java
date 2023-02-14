package com.vttp2022.day39ws.server.repository;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.time.Duration;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Repository;

import com.vttp2022.day39ws.server.model.MarvelCharacter;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;

@Repository
public class RedisRepo {
    
    @Autowired
    @Qualifier("marvelcache")   // must match bean name in RedisConfig
    private RedisTemplate<String, String> template;

    public void setKey(String name, JsonObject obj) {
        ValueOperations<String, String> ops = template.opsForValue();

        ops.set(name, obj.toString(), Duration.ofSeconds(3600));
    }

    public Optional<MarvelCharacter> getCharacterById(String id) {
        // System.out.println(id);
        ValueOperations<String, String> ops = template.opsForValue();

        String value = ops.get(id);
        // System.out.println(value);
        if (null == value) {
            return Optional.empty();
        }

        MarvelCharacter c = new MarvelCharacter();
        try (InputStream is = new ByteArrayInputStream(value.getBytes())) {
            JsonReader r = Json.createReader(is);
            c = MarvelCharacter.fromCache(r.readObject());
            return Optional.of(c);
        } catch (Exception e) {
            e.printStackTrace();
            return Optional.empty();
        }

    }
}

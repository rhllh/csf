package com.vttp2022.day37.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import com.vttp2022.day37.service.S3Service;

@Controller
@RequestMapping
public class FileUploadController {

    @Autowired
    private S3Service svc;
    
    @PostMapping(path="/upload", consumes=MediaType.MULTIPART_FORM_DATA_VALUE)
    public String uploadFile(@RequestPart MultipartFile myFile, @RequestPart String name, Model model) {
        System.out.println("/upload");

        model.addAttribute("file", myFile);
        model.addAttribute("name", name);

        String key = "";
        try {
            key = svc.upload(myFile, name);
        } catch (IOException e) {
            System.out.println(e.getMessage());
        }

        model.addAttribute("key", key);

        return "upload";
    }
}

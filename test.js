require('chromedriver')
const webdriver = require('selenium-webdriver')
let until = webdriver.until;
const by = webdriver.By;
const fs = require("fs")
const path = require("path");
let chrome = require("selenium-webdriver/chrome")
let web;
// const web = new webdriver.Builder().forBrowser('chrome').build();
const picpath = path.join(__dirname, "看枫傻不傻.png")
var assert = require('assert');
// 添加循环
describe('hooks', function () {
    this.timeout(60 * 1000)
    

    describe('用户登录发布话题并回复', async function () {
        before(function () {
            // runs before all tests in this block
            console.log("before")
            web = new webdriver.Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless()).build();
            return web.executeScript(function(){
                return {
                    width: window.screen.availWidth,
                    height: window.screen.availHeight
                };
              }).then(function(result){
                web.manage().window().setSize(result.width, result.height);
              })
        })

        after(function() {
            // runs after all tests in this block
            console.log('after');
            return web.quit();
        });
    
        beforeEach(function () {
    
        });
    
        afterEach(async function () {
            // runs after each test in this block
            //在每一步完成后添加截图
            console.log("after")
            await web.takeScreenshot().then(function (screenshot) {
               return fs.writeFileSync(new Date().valueOf() + ".png", screenshot, "base64")
            });
        });

        it('导航到登录页面', async function () {
            await web.get("http://192.168.219.129:3000")
        });
        it('最大化窗口', async function () {
            await web.manage().window().maximize()
        });
        it('点击注册按钮', async function () {
            await web.findElement(by.xpath('/html/body/div[1]/div/div/ul/li[5]/a')).click();

            // await web.findElement(by.css('body > div.navbar > div > div > ul > li:nth-child(5) > a')).click()  // 注册按钮
        });

        it('进入登录界面', async function () {
            await web.findElement(by.css('body > div.navbar > div > div > ul > li:nth-child(6) > a')).click()


        });
        it('输入账号', async function () {
            await web.findElement(by.id('name')).sendKeys('imzack')
        });
        it('输入密码', async function () {
            await web.findElement(by.id('pass')).sendKeys('123456')
        });
        it('点击登录', async function () {
            await web.findElement(by.id('pass')).submit();
        });

    })
})
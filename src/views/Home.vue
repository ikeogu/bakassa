<template>
  <div class="home">
    <Header />
    <section class="home_body">

      <div class="hero">
        <div class="hero_wrapper">
          <div class="image_wrapper">
            <img src="../assets/hero_img.png">
          </div>
          <div class="message">
            <div class="main_title">
              The World’s Leading African Languages Learning Provider
            </div>
            <div class="title_detail">
              We don’t just teach African languages to your kid, we also bring awareness of various African cultures, reintroduce them to their roots and Identity by teaching them their native language.
            </div>
            
            <form class="search">
              <input placeholder="Search A Language">
              
              <div class="btn_wrapper">
                <ButtonPlainText 
                  buttonText="Find A Tutor" 
                />
              </div> 
            
            </form>
          </div>
        </div>
        <div class="half_white"></div>
      </div>

      <div class="all_languages">
        <div class="all_languages_wrapper">
          <div class="content">
            <div class="pre_title">ONLINE AFRICAN LANGUAGE LESSONS</div>
            <div class="main_title">
              We heavily believe in the power of culture, identity and education, and that is our driving force
            </div>
            <div class="title_detail">
              We understand your children's’ social cultural barriers, and we want to help them learn their native language and discover their identity, cultures and traditions flexibly
            </div>
            <div class="points">
              <div>
                <div class="icon">
                  <img src="../assets/experience.png">
                </div>
                <div class="label">Experts Teachers</div>
              </div>
              <div>
                <div class="icon">
                  <img src="../assets/time-left.png">
                </div>
                <div class="label">Lifetime Access</div>
              </div>
              <div>
                <div class="icon">
                  <img src="../assets/tutorials.png">
                </div>
                <div class="label">Remote Learning</div>
              </div>
              <div>
                <div class="icon">
                  <img src="../assets/self-growth.png">
                </div>
                <div class="label">Self Paced Learning</div>
              </div>
            </div>
            <div class="btn_wrapper">
              <ButtonPlainText buttonText="View All Languages" />
            </div>
          </div>
        </div>
      </div>

      <div class="break_down">
        <div class="break_down_sec">
          <div class="image_wrapper">
            <img src="../assets/sec1.png">
          </div>
          <div class="details">
            <div class="title">One-to-one lessons in more than 60 African languages with flexible learning</div>
            <ul class="list">
              <li>Develop your language skills by building a connection with your chosen tutor</li>
              <li>Nurture your language development</li>
              <li>Gain knowledge of Africa and its cultures in a native learning environment</li>
            </ul>
            <div class="btn_wrapper">
              <ButtonPlainText buttonText="Find A Tutor" />
            </div>
          </div>
        </div>

         <div class="break_down_sec">
          <div class="details">
            <div class="title">How it works</div>
            <ul class="list">
              <li>Choosing an African language lesson</li>
              <li>Browse a native speaking tutor</li>
              <li>Join the best online African language class</li>
            </ul>
            <div class="btn_wrapper">
              <ButtonPlainText buttonText="Find A Language" />
            </div>
          </div>
          <div class="image_wrapper">
            <img src="../assets/sec2.png">
          </div>
        </div>

         <div class="break_down_sec">
          <div class="image_wrapper">
            <img src="../assets/sec3.png">
          </div>
          <div class="details">
            <div class="title">Join our community and practice the language with Africans from all over the world for free</div>
            <ul class="list">
              <li>Learn from qualified teachers around the globe </li>
              <li>Find African teachers from all over the world and learn the African cultures</li>
              <li>Study at your own pace, in the comfort of your own home</li>
            </ul>
            <div class="btn_wrapper">
              <ButtonPlainText buttonText="Explore Our Community" />
            </div>
          </div>
        </div>
      </div>

      <div class="records">
        <div class="half_white"></div>
        <div class="testimonies">
          <div class="pre_title">BUKASSA AFRICAN LANGUAGE LEARNING</div>
          <div class="main_title">
            Hear from Tutors, Parents, and students
          </div>

          <div class="testimony_slider">
            <div class="slide">
              <div class="ball"></div>
              <div class="quote">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Nunc sit amet volutpat orci. Nulla sed turpis in est aliquam maximus nec non nisl. 
                Etiam tortor mauris, gravida sed porta tempus, pretium sed elit. 
                Mauris vestibulum congue sem non aliquet. Nunc semper felis nec nisi mattis, ac finibus orci interdum. 
                Aliquam elementum imperdiet ipsum et bibendum. Ut vitae porttitor velit. Suspendisse ornare feugiat tortor quis porttitor. Aliquam eu hendrerit enim.
              </div>
              <div class="profile">
                <div class="user">
                  <img>
                </div>
                <div class="details">
                  <div class="name">Some Name</div>
                  <div class="title">Some Goddamn Title</div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="join">
            <div class="">Not a member yet?</div>
            <div class="register_prompt">Register now</div>
          </div>
        </div>
        <div class="metrics">
          <div>
            <div>
              <div class="num">1,926</div>
              <div>FINISHED SESSIONS</div>
            </div>
          </div>
          <div>
            <div>
              <div class="num">3,279</div>
              <div>ENROLLED LEARNERS</div>
            </div>
          </div>
          <div>
            <div>
              <div class="num">25</div>
              <div>ONLINE INSTRUCTORS</div>
            </div>
          </div>
          <div>
            <div>
              <div class="num">100</div>
              <div>SATISFACTION RATE</div>
            </div>
          </div>
        </div>
      </div>

      <div class="book_now_prompt">
        <div class="pre_title"> LEARN AT YOUR OWN PACE </div>
        <div class="main_title">
          Book a free meeting with a tutor today <br> and find out how they can help your <br> child
        </div>
        <div class="title_detail">
          Explore all of our lessons and pick your suitable ones to enroll and start learning with <br> us! We ensure that you will never regret it!
        </div>
        <div class="book_a_class_btn_wrapper">
          <ButtonPlainText buttonText="Find A Tutor" />
        </div>
      </div>
    
    </section>
    <SiteFooter />
  </div>
</template>

<script>
  import Header from '../components/Header/Header.vue';
  import ButtonPlainText from '../components/buttons/ButtonPlainText.vue';
  import SiteFooter from '../components/SiteFooter.vue'

  export default {
    name: 'Home',
    components: {
      Header,
      ButtonPlainText,
      SiteFooter
    }
}
</script>

<style scoped>
  .hero {
    height: calc(100vh - 100px);
    display: flex;
    align-items: center;
    justify-content: center;
    background: #eeb0bb21;
    position: relative;
    z-index: 0;
    overflow: hidden;
  }
  .hero .half_white {
    top: 62%;
  }
  .hero_wrapper {
    height: 80%;
    width: 90%;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
  .hero .image_wrapper {
    width: 45%;
  }
  .hero .message {
    width: 40%;
    margin: auto 0;
  }
  .hero .message .main_title {
    font-weight: 700;
    font-size: 300%;
    color: #221638;
  }
  .hero .message .title_detail {
    line-height: 150%;
    margin: 5% 0;
  }
  form.search {
    border-radius: 5px;
    background: var(--shadow-color);
    display: flex;
    width: 70%;
    height: 50px;
    overflow: hidden;
  }
  form.search input {
    width: 60%;
    padding: 5% 5%;
    border: none;
    background: none;
    font-size: 100%;
    outline: none;
  }
  form.search .btn_wrapper {
    width: 40%;
  }
  form.search button {
    border-radius: 0;
    margin: 0;
    background: var(--burgundy-100);
    color: white;
    border: none;
  }



  .all_languages {
    background: #eeb0bb21;
    padding: 5% 0;
  }
  .all_languages_wrapper {
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
  .all_languages .images {
    width: 50%;
    border: 1px solid black;
  }
  .content {
    width: 60%;
    text-align: center;
    margin: 0 auto;
  }
  .content .main_title {
    margin: 3% 0;
  }
  .all_languages .points {
    display: flex;
    flex-wrap: wrap;
  }
  .all_languages .points > div {
    width: calc(100% / 2);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2% 0%;
  }
  .all_languages .points div.icon {
    width: 10%;
  }
  .all_languages .points div.label {
    font-size: 120%;
    margin-left: 5%;
  }
  .all_languages .btn_wrapper {
    width: 40%;
    height: 50px;
    margin: 0 auto;
    margin-top: 10%;
  }
  .all_languages .btn_wrapper button {
    background: var(--burgundy-100);
    color: white;
    border: none;
  }



  .records {
    padding: 10%;
    background: #eeb0bb21;
    position: relative;
    z-index: 0;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
  }
  .half_white {
    background: white;
    width: 200%;
    height: 100%;
    position: absolute;
    z-index: -1;
    top: 55%;
    left: 0%;
    transform: rotateZ(-10deg);
  }
  .testimonies {
    width: 45%;
  }
  .testimony_slider {
    background: white;
    height: 380px;
    margin: 5% 0;
    border-radius: 10px;
    overflow: hidden;
  }
  .testimony_slider .slide {
    background: white;
    height: 100%;
    padding: 10% 0;
    position: relative;
  }
  .ball {
    width: 80px;
    height: 80px;
    background: var(--burgundy-100);
    border-radius: 50%;
    position: absolute;
    top: -5%;
    left: -5%;
  }
  .quote {
    width: 80%;
    margin: 0 auto;
    line-height: 150%;
    font-size: 100%;
    font-weight: 400;
    color: rgb(156, 156, 156);
  }
  .profile {
    display: flex;
    width: 80%;
    margin: 0 auto; 
    padding: 5% 0;
  }
  .user {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 1px 6px 8px 2px var(--shadow-color);
  }
  .details .name {
    font-size: 120%;
    font-weight: 600;
    color: var(--burgundy-100);
  }
  .records .details .title {
    font-size: 100%;
    color: var(--black-100);
    font-weight: 300; 
  }
  .testimonies .join {
    display: flex;
    color: grey;
  }
  
  .metrics {
    height: 100%;
    width: 45%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .metrics > div {
    width: calc(100% / 2.1); 
    height: 300px;
    background: #eee8e2;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    /* box-shadow: 3px 3px 10px 1px rgba(0, 0, 0, 0.144); */
  }
  .metrics > div:nth-child(1), .metrics > div:nth-child(3) {
    margin-top: 60px;
  }
  .metrics .num {
    color: var(--burgundy-100);
    font-weight: 800;
    font-size: 250%;
  }

  .join .register_prompt {
    margin-left: 1%;
    color: var(--burgundy-100);
    font-weight: 600;
  }

  .break_down > div {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5% 0;
  }
  .break_down_sec .image_wrapper {
    width: 35%;
    height: 40vh;
    border-radius: 40px 0 40px 0;
    overflow: hidden;
  }
  .break_down_sec .image_wrapper img {
    object-fit: cover;
  }
  .details {
    width: 35%;
    margin-left: 5%;
  }
  .details .title {
    font-size: 200%;
  }
  .break_down ul {
    padding: 3% 0% 3% 5%;
    line-height: 150%;
  }
  li {
    margin: 2% 0;
    font-size: 105%;
    color: grey;
    font-weight: 300;
  }
  .break_down .btn_wrapper {
    width: 50%;
    height: 40px;
    margin-top: 5%;
  }
  .break_down .btn_wrapper button{
    background: var(--burgundy-100);
    color: white;
    border: 1px solid var(--burgundy-100);
  }


  div.book_now_prompt {
    padding: 8% 0;
    text-align: center;
  }
  .pre_title {
    font-size: 90%;
    font-weight: 400;
    color: var(--burgundy-100);
  }
  .main_title {
    font-size: 230%;
    font-weight: 600;
    margin-top: 1%;
  }
  .title_detail {
    font-size: 120%;
    font-weight: 300;
    padding: 2% 0;
    color: grey;
  }
  .book_a_class_btn_wrapper {
    width: 15%;
    margin: 0 auto;
    height: 60px;
  }
  .book_a_class_btn_wrapper button {
    background: var(--burgundy-100);
    color: white;
    border: none;
    font-size: 120%;
  }

  .btn_wrapper button {
    border-radius: 5px;
  }

  @media screen and (max-width: 300px) {
    
  }
</style>
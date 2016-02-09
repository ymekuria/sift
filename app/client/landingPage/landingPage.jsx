import React, { Component } from 'react'

export const Landing = () => {
  console.log('in welcome')
  return (


  	<div>
  	
  		<div className="preloader">
			<div className="sk-spinner sk-spinner-rotating-plane"></div>
    	 </div>
	
		<nav className="navbar navbar-default navbar-fixed-top templatemo-nav" role="navigation">
			<div className="container">
				<div className="navbar-header">
					<button className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
						<span className="icon icon-bar"></span>
						<span className="icon icon-bar"></span>
						<span className="icon icon-bar"></span>
					</button>
					<a href="#" className="navbar-brand">SIFT</a>
				</div>
				<div className="collapse navbar-collapse">

					<ul className="nav navbar-nav navbar-right text-uppercase">
						<li><a href="#home">Home</a></li>
						<li><a href="#feature">Features</a></li>
						<li><a href="#pricing">Pricing</a></li>
						<li><a href="#download">Download</a></li> 
						<li><a href="#contact">Contact</a></li>
						<li><button type="button" className="nav navbar-nav navbar-right btn btn-primary">Primary</button></li>
					</ul>
					<button type="button" className="btn btn-primary">Primary</button>
				</div>
			</div>
		</nav>
		
		<section id="home">
			<div className="overlay">
				<div className="container">
					<div className="row">
						<div className="col-md-1"></div>
						<div className="col-md-10 wow fadeIn" data-wow-delay="0.3s">
							<h1 className="text-upper">Simple Integrated Fronted Toolkit</h1>
							<p className="tm-white">Build full stack web applications without worring about creating  a database or writing server-side code.</p>
							<img src="../landingPage/../landingPage/git images/software-img.png" className="img-responsive" alt="home img"/>
						</div>
						<div className="col-md-1"></div>
					</div>
				</div>
			</div>
		</section>
	
		<section id="divider">
			<div className="container">
				<div className="row">
					<div className="col-md-4 wow fadeInUp templatemo-box" data-wow-delay="0.3s">
						<i className="fa fa-laptop"></i>
						<h3 className="text-uppercase">RESPONSIVE LAYOUT</h3>
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. </p>
					</div>
					<div className="col-md-4 wow fadeInUp templatemo-box" data-wow-delay="0.3s">
						<i className="fa fa-twitter"></i>
						<h3 className="text-uppercase">BOOTSTRAP 3.3.4</h3>
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. </p>
					</div>
					<div className="col-md-4 wow fadeInUp templatemo-box" data-wow-delay="0.3s">
						<i className="fa fa-font"></i>
						<h3 className="text-uppercase">GOOGLE FONT</h3>
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. </p>
					</div>
				</div>
			</div>
		</section>

		<section id="feature">
			<div className="container">
				<div className="row">
					<div className="col-md-6 wow fadeInLeft" data-wow-delay="0.6s">
						<h2 className="text-uppercase">Features</h2>
						<p>Creat data tables with an intuitive graphical interface</p>
						<p><span><i className="fa fa-mobile"></i></span>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
						<p><i className="fa fa-code"></i>Quis autem velis reprehenderit et quis voluptate velit esse quam.</p>
					</div>
					<div className="col-md-6 wow fadeInRight" data-wow-delay="0.6s">
						<img src="../landingPage/git images/software-img.png" className="img-responsive" alt="feature img"/>
					</div>
				</div>
			</div>
		</section>

		<section id="feature1">
			<div className="container">
				<div className="row">
					<div className="col-md-6 wow fadeInUp" data-wow-delay="0.6s">
						<img src="../landingPage/git images/software-img.png" className="img-responsive" alt="feature img"/>
					</div>
					<div className="col-md-6 wow fadeInUp" data-wow-delay="0.6s">
						<h2 className="text-uppercase">Customize Your Data</h2>
						<p>Generate Data and store it to aid in your FrontEnd development projects</p>
						<p><span><i className="fa fa-mobile"></i></span>Instantly generate data for your database from a list of popular fields. </p>
						<p><i className="fa fa-code"></i>Build custom API endpoints to use in your projects with the click of a button</p>
					</div>
				</div>
			</div>
		</section>

		<section id="download">
			<div className="container">
				<div className="row">
					<div className="col-md-6 wow fadeInLeft" data-wow-delay="0.6s">
						<h2 className="text-uppercase">Download Our Software</h2>
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. </p>
						<button className="btn btn-primary text-uppercase"><i className="fa fa-download"></i> Download</button>
					</div>
					<div className="col-md-6 wow fadeInRight" data-wow-delay="0.6s">
						<img src="../landingPage/git images/software-img.png" className="img-responsive" alt="feature img"/>
					</div>
				</div>
			</div>
		</section>

		<section id="contact">
			<div className="overlay">
				<div className="container">
					<div className="row">
						<div className="col-md-6 wow fadeInUp" data-wow-delay="0.6s">
							<h2 className="text-uppercase">Contact Us</h2>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. </p>
							<address>
								<p><i className="fa fa-map-marker"></i>36 Street Name, City Name, United States</p>
								<p><i className="fa fa-phone"></i> 010-010-0110 or 020-020-0220</p>
								<p><i className="fa fa-envelope-o"></i> info@company.com</p>
							</address>
						</div>
						<div className="col-md-6 wow fadeInUp" data-wow-delay="0.6s">
							<div className="contact-form">
								<form action="#" method="post">
									<div className="col-md-6">
										<input type="text" className="form-control" placeholder="Name"/>
									</div>
									<div className="col-md-6">
										<input type="email" className="form-control" placeholder="Email"/>
									</div>
									<div className="col-md-12">
										<input type="text" className="form-control" placeholder="Subject"/>
									</div>
									<div className="col-md-12">
										<textarea className="form-control" placeholder="Message" rows="4"></textarea>
									</div>
									<div className="col-md-8">
										<input type="submit" className="form-control text-uppercase" value="Send"/>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<footer>
			<div className="container">
				<div className="row">
					<p>Copyright © 2016 SIFT</p>
				</div>
			</div>
		</footer>

  	</div>)
}
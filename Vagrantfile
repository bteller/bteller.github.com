Vagrant.configure("2") do |config|
  config.vm.box = "precise64"
  config.vm.box_url = "http://files.vagrantup.com/precise32.box"
  config.vm.network "forwarded_port", guest: 4000, host: 4000
  config.vm.provision :shell, :path => "provision.sh"

  # config.ssh.forward_agent = true
end
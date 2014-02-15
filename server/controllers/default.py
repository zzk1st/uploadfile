# -*- coding: utf-8 -*-
# this file is released under public domain and you can use without limitations

#########################################################################
## This is a sample controller
## - index is the default action of any application
## - user is required for authentication and authorization
## - download is for downloading files uploaded in the db (does streaming)
## - call exposes all registered services (none by default)
#########################################################################


def download():
    return response.download(request,db)
def link():
    return response.download(request,db,attachment=False)

def makeThumbnail(dbtable,ImageID,size=(150,150)):
    try:
        thisImage=db(dbtable.id==ImageID).select()[0]
        import os, uuid
        from PIL import Image
    except:
        return

    im=Image.open(request.folder + 'uploads/' + thisImage.imagefile)
    im.thumbnail(size,Image.ANTIALIAS)
    thumbnailName=request.folder + 'uploads/' + 'uploads.thumbnail.%s.jpg' % (uuid.uuid4())
    im.save(thumbnailName,'jpeg')

    thumbnailStream = open(thumbnailName, 'rb')
    thumbnail = dbtable.thumbnail.store(thumbnailStream, thumbnailName)
    thisImage.update_record(thumbnail=thumbnail)
    return

#def upload():
#    image = db.image.imagefile.store(request.vars.image_file.file, request.vars.image_file.filename)
#    id = db.image.insert(imagefile=image,title=request.vars.image_title)
#    makeThumbnail(db.image, id)
#    return "succeed"

#def addimage():
#    return locals()
    
def getimagelist():
    # don't know what it is, it's related to accessing server with different port
    response.headers['Access-Control-Allow-Origin'] = "*"
    imageList=dict()
    if id in request.vars:
        images = db().select(db.image.id==request.vars.id)
    else:
        images = db().select(db.image.ALL)
        
    for image in images:
        # the code below is ugly, but we can't simply copy it by image.__dict__, since there are other fields in image
        imageList[image.id] = dict(id=image.id, upload_time=image.upload_time, address=image.address, note=image.note, imagefile=image.imagefile, thumbnail=image.thumbnail)
        
    return dict(images=imageList)
    
    
def index():
    form = SQLFORM(db.image)
    if form.process().accepted:
        makeThumbnail(db.image, form.vars.id)
        response.flash = 'Your image is uploaded'
	
    images = db().select(db.image.ALL)
    return dict(images=images, form=form)

    # code used to create a normal form and update database
	#image_form = FORM(
    #    INPUT(_name='image_title',_type='text'),
	#	INPUT(_name='image_file',_type='file')
	#	)
	#if image_form.accepts(request.vars,formname='image_form'):	
	#	#image = db.image.imagefile.store(image_form.vars.image_file.file, image_form.vars.image_file.filename)
	#	image = db.image.imagefile.store(request.vars.image_file.file, request.vars.image_file.filename)
	#	id = db.image.insert(imagefile=image,title=image_form.vars.image_title)
	#images = db().select(db.image.ALL)
	#return dict(images=images)

def user():
    """
    exposes:
    http://..../[app]/default/user/login
    http://..../[app]/default/user/logout
    http://..../[app]/default/user/register
    http://..../[app]/default/user/profile
    http://..../[app]/default/user/retrieve_password
    http://..../[app]/default/user/change_password
    http://..../[app]/default/user/manage_users (requires membership in
    use @auth.requires_login()
        @auth.requires_membership('group name')
        @auth.requires_permission('read','table name',record_id)
    to decorate functions that need access control
    """
    return dict(form=auth())

def call():
    """
    exposes services. for example:
    http://..../[app]/default/call/jsonrpc
    decorate with @services.jsonrpc the functions to expose
    supports xml, json, xmlrpc, jsonrpc, amfrpc, rss, csv
    """
    return service()


@auth.requires_signature()
def data():
    """
    http://..../[app]/default/data/tables
    http://..../[app]/default/data/create/[table]
    http://..../[app]/default/data/read/[table]/[id]
    http://..../[app]/default/data/update/[table]/[id]
    http://..../[app]/default/data/delete/[table]/[id]
    http://..../[app]/default/data/select/[table]
    http://..../[app]/default/data/search/[table]
    but URLs must be signed, i.e. linked with
      A('table',_href=URL('data/tables',user_signature=True))
    or with the signed load operator
      LOAD('default','data.load',args='tables',ajax=True,user_signature=True)
    """
    return dict(form=crud())
